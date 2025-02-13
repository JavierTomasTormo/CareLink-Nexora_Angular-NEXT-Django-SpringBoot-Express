import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { CookieService } from '../../../../core/services/cookies/cookie.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { User } from '../../../../core/models/Users/user.model';

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
  filteredPatients: UserPatient[] = [];
  selectedPatient: UserPatient | null = null;
  currentFilter: string = '';
  viewMode: 'list' | 'detail' = 'list';
  activeTab: string = 'family';

  metrics = {
    active: 0,
    specialNeeds: 0,
    allergies: 0
  };

  disabilityData: ChartData<'doughnut'> = {
    labels: ['With Disability', 'Without Disability'],
    datasets: [{
      data: [],
      backgroundColor: ['#9333ea', '#e5e7eb']
    }]
  };

  patientDetailsData: ChartData<'radar'> = {
    labels: ['Health Score', 'Activity Level', 'Medication Adherence', 'Diet Score', 'Sleep Quality'],
    datasets: [{
      label: 'Current Month',
      data: [],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)'
    }]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 }
      }
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
    this.userPatientService.getUserPatientsByUser(this.user.id_user).subscribe({
      next: (data) => {
        this.userPatients = data;
        this.filteredPatients = data;
        this.updateMetrics();
        this.updateDisabilityChart();
      },
      error: (error) => console.error('Error loading patients:', error)
    });
  }

  selectPatient(patient: UserPatient): void {
    this.selectedPatient = patient;
    this.viewMode = 'detail';
    
    const metrics = this.calculatePatientMetrics(patient);
    
    this.patientDetailsData.datasets[0].data = [
      metrics.healthScore,
      metrics.activityLevel,
      metrics.medicationAdherence,
      metrics.dietScore,
      metrics.sleepQuality
    ];
  }

  private updateDisabilityChart(): void {
    const withDisability = this.userPatients.filter(p => p.discapacity).length;
    const total = this.userPatients.length;
    const withoutDisability = total - withDisability;
    
    this.disabilityData.datasets[0].data = [
      (withDisability / total) * 100,
      (withoutDisability / total) * 100
    ];
  }

  private calculatePatientMetrics(patient: UserPatient) {
    const healthScore = 100 - 
      ((patient.allergies?.length || 0) * 5) - 
      ((patient.difficulties?.length || 0) * 5) - 
      (patient.discapacity ? 10 : 0);

    const activityLevel = patient.difficulties?.includes('mobility') ? 10 : 85;
    const medicationAdherence = patient.isactive ? 90 : 20;
    const dietScore = patient.allergies?.length ? 15 : 95;
    const sleepQuality = patient.difficulties?.includes('sleep') ? 25 : 88;

    return {
      healthScore: Math.max(healthScore, 0),
      activityLevel,
      medicationAdherence,
      dietScore,
      sleepQuality
    };
  }

  public calculateHealthScore(patient: UserPatient): number {
    return this.calculatePatientMetrics(patient).healthScore;
  }

  public calculateActivityLevel(patient: UserPatient): number {
    return this.calculatePatientMetrics(patient).activityLevel;
  }

  public calculateMedicationAdherence(patient: UserPatient): number {
    return this.calculatePatientMetrics(patient).medicationAdherence;
  }

  backToList(): void {
    this.viewMode = 'list';
    this.selectedPatient = null;
  }

  filterPatients(category: string): void {
    this.currentFilter = category;
    switch(category) {
      case 'active':
        this.filteredPatients = this.userPatients.filter(p => p.isactive);
        break;
      case 'specialNeeds':
        this.filteredPatients = this.userPatients.filter(p => p.discapacity);
        break;
      case 'allergies':
        this.filteredPatients = this.userPatients.filter(p => p.allergies?.length > 0);
        break;
      case 'all':
      default:
        this.filteredPatients = this.userPatients;
        break;
    }
  }

  setActiveTab(activeTab: string): void {
      console.log('Active tab changed to:', activeTab);
      this.activeTab = activeTab;
  } 

  private updateMetrics(): void {
    this.metrics = {
      active: this.userPatients.filter(p => p.isactive).length,
      specialNeeds: this.userPatients.filter(p => p.discapacity).length,
      allergies: this.userPatients.reduce((acc, p) => acc + (p.allergies?.length || 0), 0)
    };
  }
}
