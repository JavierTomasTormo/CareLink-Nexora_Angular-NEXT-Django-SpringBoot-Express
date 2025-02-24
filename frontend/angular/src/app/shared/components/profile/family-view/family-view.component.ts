import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { CookieService } from '../../../../core/services/cookies/cookie.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { User } from '../../../../core/models/Users/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SHARED_ROUTES } from '../../../../core/constants/shared.routes';


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
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.cookieService.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadUserPatients();
  
    this.route.queryParams.subscribe(params => {
      const patientEmail = params['email'];
      if (patientEmail) {
        this.userPatientService.getUserPatientsByUser(this.user.id_user).subscribe({
          next: (data) => {
            this.userPatients = data;
            this.filteredPatients = data;
            this.updateMetrics();
            this.updateDisabilityChart();
            this.selectPatientByEmail(patientEmail);
          }
        });
      }
    });
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

  selectPatientByEmail(email: string): void {
    const patient = this.userPatients.find(p => p.email === email);
    // console.log('Selected patient email:', email);
    // console.log('Patients:', this.userPatients);
    // console.log('Selected patient:', patient);
    if (patient) {
      this.selectPatient(patient);
    }
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

  hasDifficulties(patient: UserPatient): boolean {
    return patient.difficulties && patient.difficulties.length > 0;
  }
  getTagClass(patient: UserPatient): string {
    return patient.isactive ? 'tag-active' : 'tag-inactive';
  }

  hasAllegies(patient: UserPatient): boolean {
    return patient.allergies && patient.allergies.length > 0;
  }
  

  private updateMetrics(): void {
    this.metrics = {
      active: this.userPatients.filter(p => p.isactive).length,
      specialNeeds: this.userPatients.filter(p => p.discapacity).length,
      allergies: this.userPatients.reduce((acc, p) => acc + (p.allergies?.length || 0), 0)
    };
  }


  registerPatient(): void {
    // console.log('Current URL:', this.router.url);
    this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.PATIENT_REGISTER]);
    // console.log('Current URL--2:', this.router.url);
  }


  editPatient(): void {
    const patient = this.selectedPatient;
    this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.PATIENT_UPDATE, patient!.id]);
  }


}



