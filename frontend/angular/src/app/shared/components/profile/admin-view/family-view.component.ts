import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { CookieService } from '../../../../core/services/cookies/cookie.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { User } from '../../../../core/models/Users/user.model';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';

@Component({
  selector: 'app-family-view',
  standalone: true,
  imports: [CommonModule, NgChartsModule, ProfileTabsComponent],
  templateUrl: './family-view.component.html',
  styleUrls: ['./family-view.component.css']
})
export class FamilyViewComponent implements OnInit {
  user!: User;
  userPatients: UserPatient[] = [];
  activePatientsCount: number = 0;
  specialNeedsCount: number = 0;
  totalAllergies: number = 0;
  totalDifficulties: number = 0;
  averageAge: number = 0;
  activeTab: string = 'family';


  // Configuración del gráfico de alergias
  allergiesChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  allergiesChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    }
  };

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
        this.calculateMetrics();
        this.prepareChartData();
      },
      error => {
        console.error('Error loading user patients:', error);
      }
    );
  }

  calculateMetrics(): void {
    this.activePatientsCount = this.userPatients.filter(p => p.isactive).length;
    this.specialNeedsCount = this.userPatients.filter(p => p.discapacity).length;
    this.totalAllergies = this.userPatients.reduce((acc, curr) => acc + (curr.allergies?.length || 0), 0);
    this.totalDifficulties = this.userPatients.reduce((acc, curr) => acc + (curr.difficulties?.length || 0), 0);
    this.calculateAverageAge();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  calculateAverageAge(): void {
    const today = new Date();
    const totalAge = this.userPatients.reduce((acc, curr) => {
      const birthDate = new Date(curr.birthday);
      const age = today.getFullYear() - birthDate.getFullYear();
      return acc + age;
    }, 0);
    this.averageAge = Math.round(totalAge / this.userPatients.length);
  }

  prepareChartData(): void {
    const allergiesMap = new Map<string, number>();
    
    this.userPatients.forEach(patient => {
      (patient.allergies as string[])?.forEach((allergy: string): void => {
        allergiesMap.set(allergy, (allergiesMap.get(allergy) || 0) + 1);
      });
    });

    this.allergiesChartData = {
      labels: Array.from(allergiesMap.keys()),
      datasets: [{
        data: Array.from(allergiesMap.values()),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }]
    };
  }
}