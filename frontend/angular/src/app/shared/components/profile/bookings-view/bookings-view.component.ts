import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../../../core/services/bookings/bookings.service';
import { ActivityService } from '../../../../core/services/activities/activity.service';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';

@Component({
  selector: 'app-bookings-view',
  standalone: true,
  imports: [CommonModule, NgChartsModule, ProfileTabsComponent],
  templateUrl: './bookings-view.component.html',
  styleUrls: ['./bookings-view.component.css']
})
export class BookingsViewComponent implements OnInit {
  bookings: any[] = [];
  isLoading = true;
  errorMessage = '';
  selectedActivity: any;
  selectedPatient: UserPatient | undefined;
  activeFilter: string = 'all';
  filteredBookings: any[] = [];
  totalGastado: number = 0;
  activeTab: string = 'reservations';

  // Configuración de gráficos
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
        text: 'Gasto Diario'
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
    private userPatientService: UserPatientService
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  setActiveTab(activeTab: string): void {
    console.log('Active tab changed to:', activeTab);
    this.activeTab = activeTab;
  }

  fetchBookings(): void {
    this.isLoading = true;
    this.bookingsService.getBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.filteredBookings = data;
        this.loadAdditionalData();
        this.calculateMetrics();
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

      this.userPatientService.getUserPatientsByUser(booking.idPatient).subscribe({
        next: (patientData) => {
          booking.patient = Array.isArray(patientData) ? patientData : [patientData];
        },
        error: (error) => console.error('Error al obtener datos del paciente:', error)
      });
    });
  }

  calculateMetrics(): void {
    this.updateTotalGastado();
    this.updateDailySpending();
    console.log('Bookings:', this.bookings);
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

  getPendingBookings(): number {
    return this.bookings.filter(b => b.state === 'pending').length;
  }

  getCompletedBookings(): number {
    return this.bookings.filter(b => b.state === 'completed').length;
  }

  getCancelledBookings(): number {
    return this.bookings.filter(b => b.state === 'cancelled').length;
  }

  private updateMetrics(): void {
    this.calculateMetrics();
  }
}