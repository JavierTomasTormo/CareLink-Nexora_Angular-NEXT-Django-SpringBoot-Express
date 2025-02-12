import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { CookieService } from '../../../../core/services/cookies/cookie.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { User } from '../../../../core/models/Users/user.model';

@Component({
  selector: 'app-family-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './family-view.component.html',
  styleUrls: ['./family-view.component.css']
})
export class FamilyViewComponent implements OnInit {
  user!: User;
  userPatients: UserPatient[] = [];

  constructor(
    private userPatientService: UserPatientService,
    private cookieService: CookieService
  ) {
    this.user = this.cookieService.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadUserPatients();
  }

  loadUserPatients(): void {
    this.userPatientService.getUserPatientsByUser(this.user.id_user).subscribe(
      (data: UserPatient[]) => {
        this.userPatients = data;
        console.log('User Patients:', this.userPatients); 
      },
      error => {
      console.error('Error loading user patients:', error);
      }
    );
  }
  
}