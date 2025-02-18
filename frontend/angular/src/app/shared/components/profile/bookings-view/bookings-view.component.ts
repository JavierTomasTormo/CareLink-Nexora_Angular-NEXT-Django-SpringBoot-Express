import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookingsService } from '../../../../core/services/bookings/bookings.service';
import { ActivityService } from '../../../../core/services/activities/activity.service';
import { UserPatientService } from '../../../../core/services/users/user-patient-2.service';

@Component({
  selector: 'app-bookings-view',
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule],
  templateUrl: './bookings-view.component.html',
  styleUrls: ['./bookings-view.component.css']
})
export class BookingsViewComponent implements OnInit {
  bookings: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private bookingsService: BookingsService,
    private activityService: ActivityService,
    private userPatientService: UserPatientService
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.bookingsService.getBookings().subscribe({
      next: (data) => {
        console.log('Bookings data:', data); // Log de depuración
        this.bookings = data;
        this.loadAdditionalData();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
        this.errorMessage = 'Error fetching bookings';
        this.isLoading = false;
      }
    });
  }

  loadAdditionalData(): void {
    this.bookings.forEach(booking => {
      console.log('Fetching activity for booking:', booking.idActivity); // Log de depuración
      this.activityService.getActivityById(booking.idActivity).subscribe({
        next: (activityData) => {
          console.log('Activity data for booking', booking.idActivity, ':', activityData); // Log de depuración
          booking.activity = activityData;
        },
        error: (error) => {
          console.error('Error fetching activity data:', error);
        }
      });

      console.log('Fetching patient for booking:', booking.idPatient); // Log de depuración
      this.userPatientService.getUserPatientsByUser(booking.idPatient).subscribe({
        next: (patientData) => {
          console.log('Patient data for booking', booking.idPatient, ':', patientData); // Log de depuración
          booking.patient = patientData;
          console.log('Assigned patient data to booking:', booking.patient); // Log de depuración
        },
        error: (error) => {
          console.error('Error fetching patient data:', error);
        }
      });
    });
  }
}