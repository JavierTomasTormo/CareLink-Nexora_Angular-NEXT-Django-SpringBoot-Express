import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { CookieService } from '../../../../core/services/cookies/cookie.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { User } from '../../../../core/models/Users/user.model';


interface HealthMetrics {
  healthScore: number;
  activityLevel: number;
  medicationAdherence: number;
  dietScore: number;
  sleepQuality: number;
}

interface PatientMetrics {
  labels: string[];
  values: number[];
}

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
    allergies: 0,
    difficulties: 0
  };

  // patientHealthData: ChartData<'line'> = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Health Score',
  //       data: [],
  //       borderColor: '#4CAF50',
  //       tension: 0.1
  //     }
  //   ]
  // };

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

  // patientActivityData: ChartData<'bar'> = {
  //   labels: ['Exercise', 'Sleep', 'Diet', 'Medication'],
  //   datasets: [
  //     {
  //       label: 'Compliance Score',
  //       data: [],
  //       backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0']
  //     }
  //   ]
  // };

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


  patientChartData: ChartData<'radar'> = {
    labels: ['Salud General', 'Actividad', 'Medicación', 'Dieta', 'Sueño'],
    datasets: [{
      data: [],
      label: 'Métricas de Salud',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
    }]
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

  // loadUserPatients(): void {
  //   this.userPatientService.getUserPatientsByUser(this.user.id_user).subscribe({
  //     next: (data) => {
  //       this.userPatients = data;
  //       this.filteredPatients = data;
  //       this.updateMetrics();
  //     },
  //     error: (error) => console.error('Error loading patients:', error)
  //   });
  // }
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

  // selectPatient(patient: UserPatient): void {
  //   this.selectedPatient = patient;
  //   this.viewMode = 'detail';
  //   this.updatePatientCharts(patient);
  // }
  selectPatient(patient: UserPatient): void {
    this.selectedPatient = patient;
    this.viewMode = 'detail';
    this.updatePatientDetailsChart(patient);
  }

  showPatientDetails(patient: UserPatient): void {
    this.selectedPatient = patient;
    this.updatePatientMetrics(patient);
  }

  private updatePatientMetrics(patient: UserPatient): void {
    const metrics = this.calculatePatientMetrics(patient);
    
    // Actualizar datos del gráfico
    this.patientChartData.datasets[0].data = [
      metrics.healthScore,
      metrics.activityLevel,
      metrics.medicationAdherence,
      metrics.dietScore,
      metrics.sleepQuality
    ];
  }

  // updatePatientCharts(patient: UserPatient): void {
  //   this.patientHealthData.datasets[0].data = [65, 70, 68, 72, 75, 73];
  //   this.patientActivityData.datasets[0].data = [80, 65, 90, 85];
  // }
  private updateDisabilityChart(): void {
    const withDisability = this.userPatients.filter(p => p.discapacity).length;
    const total = this.userPatients.length;
    const withoutDisability = total - withDisability;
    
    this.disabilityData.datasets[0].data = [
      (withDisability / total) * 100,
      (withoutDisability / total) * 100
    ];
  }

  updatePatientDetailsChart(patient: UserPatient): void {
    const metrics = this.calculatePatientMetrics(patient);
    
    // Actualizar datos del gráfico radar
    this.patientDetailsData.datasets[0].data = [
      metrics.healthScore,
      metrics.activityLevel,
      metrics.medicationAdherence,
      metrics.dietScore,
      metrics.sleepQuality
    ];
  }

  private calculatePatientMetrics(patient: UserPatient): HealthMetrics {
    const healthScore = 100 - 
      ((patient.allergies?.length || 0) * 5) - 
      ((patient.difficulties?.length || 0) * 5) - 
      (patient.discapacity ? 10 : 0);

    // Cálculos basados en la condición del paciente
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

  public calculateDietScore(patient: UserPatient): number {
    return this.calculatePatientMetrics(patient).dietScore;
  }

  public calculateSleepQuality(patient: UserPatient): number {
    return this.calculatePatientMetrics(patient).sleepQuality;
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
      allergies: this.userPatients.reduce((acc, p) => acc + (p.allergies?.length || 0), 0),
      difficulties: this.userPatients.reduce((acc, p) => acc + (p.difficulties?.length || 0), 0)
    };
  }
}
