import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../../../core/services/bookings/bookings.service';
import { ActivityService } from '../../../../core/services/activities/activity.service';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { NgChartsModule, BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookings-view',
  standalone: true,
  imports: [CommonModule, NgChartsModule, ProfileTabsComponent],
  templateUrl: './bookings-view.component.html',
  styleUrls: ['./bookings-view.component.css']
})

export class BookingsViewComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  bookings: any[] = [];
  isLoading = true;
  errorMessage = '';
  activeFilter: string = 'all';
  filteredBookings: any[] = [];
  activeTab: string = 'reservations';
  selectedUsers: string[] = [];
  uniquePatients: any[] = [];
  sortDirectionCreatedAt: 'asc' | 'desc' = 'asc';
  sortDirectionStatus: 'asc' | 'desc' = 'asc';
  totalGastado: number = 0;


  currentPage: number = 1;
  itemsPerPage: number = 5;

  barChartData: ChartData = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: '#4F46E5',
      label: 'Gasto por Usuario (€)'
    }]
  };
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '€';
          }
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  };

  dailySpendingData: ChartData = {
    labels: [],
    datasets: [{
      data: [],
      borderColor: '#4F46E5',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      label: 'Gasto Diario (€)'
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      title: {
        display: true,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '€';
          }
        }
      }
    }
  };

  constructor(
    private bookingsService: BookingsService,
    private activityService: ActivityService,
    private userPatientService: UserPatientService,
    private router: Router
  ) {
    this.sortDirectionCreatedAt = 'asc';
    this.sortDirectionStatus = 'asc';
  }

  ngOnInit(): void {
    this.fetchBookings();
    setTimeout(() => {
      if (this.uniquePatients.length > 0) {
        this.updateUserBarChart();
      }
    }, 1000);
  }

  setActiveTab(activeTab: string): void {
    this.activeTab = activeTab;
  }

  fetchBookings(): void {
    this.isLoading = true;
    this.bookingsService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.filteredBookings = data;
        this.loadAdditionalData();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 403) {
          this.errorMessage = 'No estás autorizado para ver estas reservas. Por favor, inicia sesión de nuevo.';
        } else {
          this.errorMessage = 'No se pudieron cargar las reservas. Por favor, inténtalo más tarde.';
        }
      }
    });
  }

  updateUserBarChart(): void {
    const userSpending = new Map<string, number>();
    
    this.filteredBookings.forEach(booking => {
      if (booking.activity?.price && booking.patientName) {
        const price = parseFloat(booking.activity.price);
        const currentTotal = userSpending.get(booking.patientName) || 0;
        userSpending.set(booking.patientName, currentTotal + price);
      }
    });

    let spendingData = Array.from(userSpending.entries());
    
    if (this.selectedUsers.length > 0) {
      spendingData = spendingData.filter(([name]) => 
        this.selectedUsers.includes(name)
      );
    }

    this.barChartData = {
      labels: spendingData.map(([name]) => name),
      datasets: [{
        data: spendingData.map(([_, amount]) => amount),
        backgroundColor: ['#4F46E5', '#EC4899', '#F59E0B', '#10B981', '#6366F1'],
        label: 'Gasto por Usuario (€)'
      }]
    };

    if (this.chart) {
      this.chart.update();
    }
  }

  onUsersSelect(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedUsers.push(checkbox.value);
    } else {
      this.selectedUsers = this.selectedUsers.filter(name => name !== checkbox.value);
    }
    this.updateUserBarChart();
  }

  loadAdditionalData(): void {
    let activitiesLoaded = 0;
    const totalActivities = this.bookings.length;

    this.bookings.forEach(booking => {
      this.activityService.getActivityById(booking.idActivity).subscribe({
        next: (activityData) => {
          booking.activity = activityData;
          activitiesLoaded++;
          if (activitiesLoaded === totalActivities) {
            this.updateMetrics();
          }
        },
        error: (error) => console.error('Error al obtener datos de actividad:', error)
      });

      this.userPatientService.getUserPatientsByUser(booking.idUser).subscribe({
        next: (patientData) => {
          const patient = patientData.find(p => p.id === booking.idPatient);
          if (patient) {
            booking.patientName = patient.name_patient;
            booking.patientEmail = patient.email;
            this.updateUniquePatients();
          }
        },
        error: (error) => console.error('Error al obtener datos del paciente:', error)
      });
    });
  }

  private updateUniquePatients(): void {
    const patientsMap = new Map();
    this.bookings.forEach(booking => {
      if (booking.patientName && !patientsMap.has(booking.idPatient)) {
        patientsMap.set(booking.idPatient, {
          id: booking.idPatient,
          name: booking.patientName
        });
      }
    });
    this.uniquePatients = Array.from(patientsMap.values());
  }

  calculateMetrics(): void {
    this.updateTotalGastado();
    this.updateDailySpending();
    this.updateUserBarChart();
  }

  updateTotalGastado(): void {
    this.totalGastado = this.filteredBookings.reduce((total, booking) => {
      const price = booking.activity?.price ? parseFloat(booking.activity.price) : 0;
      return total + price;
    }, 0);
  }

  updateDailySpending(): void {
    const dailyTotals = new Map<string, number>();

    this.filteredBookings.forEach(booking => {
      if (booking.activity?.price) {
        const date = `${booking.idDay}/${booking.idMonth}/${booking.createdAt[0]}`;
        const price = parseFloat(booking.activity.price);
        dailyTotals.set(date, (dailyTotals.get(date) || 0) + price);
      }
    });

    const sortedDates = Array.from(dailyTotals.keys()).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    this.dailySpendingData.labels = sortedDates;
    this.dailySpendingData.datasets[0].data = sortedDates.map(date => dailyTotals.get(date) || 0);

    if (this.chart) {
      this.chart.update();
    }
  }

  filterBookings(status: string): void {
    this.activeFilter = status;
    if (status === 'all') {
      this.filteredBookings = this.bookings;
    } else {
      this.filteredBookings = this.bookings.filter(b => b.state === status);
    }
    this.calculateMetrics();
  }

  sortBookingsByCreatedAt(): void {
    this.sortDirectionCreatedAt = this.sortDirectionCreatedAt === 'asc' ? 'desc' : 'asc';
    this.filteredBookings.sort((a, b) => {
      const dateA = new Date(a.createdAt[0], a.createdAt[1] - 1, a.createdAt[2]);
      const dateB = new Date(b.createdAt[0], b.createdAt[1] - 1, b.createdAt[2]);
      return this.sortDirectionCreatedAt === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    this.calculateMetrics();
  }

  sortBookingsByStatus(): void {
    this.sortDirectionStatus = this.sortDirectionStatus === 'asc' ? 'desc' : 'asc';
    this.filteredBookings.sort((a, b) => {
      return this.sortDirectionStatus === 'asc' ? a.state.localeCompare(b.state) : b.state.localeCompare(a.state);
    });
    this.calculateMetrics();
  }

  getPendingBookings(): number {
    return this.bookings.filter(b => b.state === 'pending').length;
  }

  getCompletedBookings(): number {
    return this.bookings.filter(b => b.state === 'completed').length;
  }

  getCancelledBookings(): number {
    return this.bookings.filter(b => b.state === 'cancelled').length;
  }

  get paginatedBookings(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredBookings.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredBookings.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.filteredBookings.length) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  showActivityDetails(booking: any): void {
    console.log('Booking details:', booking);
  }

  showPatientDetails(booking: any): void {
    if (booking.patientEmail) {
      this.router.navigate(['/profile/family/view'], { 
        queryParams: { email: booking.patientEmail }
      });
    }
  }

  private updateMetrics(): void {
    this.calculateMetrics();
  }
}
