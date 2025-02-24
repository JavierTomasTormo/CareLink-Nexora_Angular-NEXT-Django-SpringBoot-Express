import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../../../core/services/bookings/bookings.service';
import { ActivityService } from '../../../../core/services/activities/activity.service';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
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
  modalRef?: NgbModalRef;
  activeTab: string = 'reservations';


  // Métricas
  totalGastado = 0;
  actividadesPreferidas: any[] = [];
  
  // Configuración del gráfico de actividades
  activityChartData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  } = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#4F46E5',
        '#7C3AED',
        '#EC4899',
        '#F59E0B',
        '#10B981'
      ]
    }]
  };

  constructor(
    private bookingsService: BookingsService,
    private activityService: ActivityService,
    private userPatientService: UserPatientService,
    private modalService: NgbModal
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
    this.bookings.forEach(booking => {

      console.log('Booking:', booking);

      this.activityService.getActivityById(booking.idActivity).subscribe({
        next: (activityData) => {
          booking.activity = activityData;
          this.updateMetrics();
        },
        error: (error) => console.error('Error al obtener datos de actividad:', error)
      });

      this.userPatientService.getUserPatientsByUser(booking.idPatient).subscribe({
        next: (patientData) => booking.patient = patientData,
        error: (error) => console.error('Error al obtener datos del paciente:', error)
      });
    });
  }

  calculateMetrics(): void {
    this.updateTotalGastado();
    this.updateActividadesPreferidas();
  }

  updateTotalGastado(): void {
    this.totalGastado = this.bookings.reduce((total, booking) => 
      total + (parseFloat(booking.activity?.price) || 0), 0);
  }

  updateActividadesPreferidas(): void {
    const activityCount = new Map();
    this.bookings.forEach(booking => {
      const activityName = booking.activity?.name_activitie;
      if (activityName) {
        activityCount.set(activityName, (activityCount.get(activityName) || 0) + 1);
      }
    });

    this.actividadesPreferidas = Array.from(activityCount.entries())
      .map(([name, count]) => ({name, count}))
      .sort((a, b) => b.count - a.count);

    this.updateChartData();
  }

  updateChartData(): void {
    this.activityChartData.labels = this.actividadesPreferidas.map(a => a.name);
    this.activityChartData.datasets[0].data = this.actividadesPreferidas.map(a => a.count);
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

  get pendingBookingsCount(): number {
    return this.bookings.filter(b => b.state === 'pending').length;
  }

  get completedBookingsCount(): number {
    return this.bookings.filter(b => b.state === 'completed').length;
  }

  get cancelledBookingsCount(): number {
    return this.bookings.filter(b => b.state === 'cancelled').length;
  }

  showActivityDetails(modal: any, activity: any): void {
    this.selectedActivity = activity;
    this.modalRef = this.modalService.open(modal);
  }

  showPatientDetails(modal: any, patient: UserPatient): void {
    this.selectedPatient = patient;
    this.modalRef = this.modalService.open(modal);
  }

  private updateMetrics(): void {
    this.calculateMetrics();
  }
}