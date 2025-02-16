import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPatientService } from '../../../../core/services/users/user-patient.service';
import { CookieService } from '../../../../core/services/cookies/cookie.service';
import { UserPatient } from '../../../../core/models/Users/user-patient.model';
import { SHARED_ROUTES } from '../../../../core/constants/shared.routes';
import Swal from 'sweetalert2';

import { 
  AllergyCategories, 
  DEFAULT_ACTIVE_CATEGORY, 
  ALLERGIES_CATEGORIES, 
  DifficultiesCategories, 
  DEFAULT_DIFFICULTY_CATEGORY, 
  DIFFICULTIES_CATEGORIES 
} from '../../../../core/constants/modal.content';

@Component({
  selector: 'app-patient-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit {
  patientId!: number;
  patientForm!: FormGroup;
  allergiesForm!: FormGroup;
  difficultiesForm!: FormGroup;
  currentUser: any;
  isSubmitting = false;

  showAllergiesModal = false;
  selectedAllergies: string[] = [];
  activeCategory: keyof AllergyCategories = DEFAULT_ACTIVE_CATEGORY;
  allergiesCategories = ALLERGIES_CATEGORIES;

  showDifficultiesModal = false;
  selectedDifficulties: string[] = [];
  activeDifficultyCategory: keyof DifficultiesCategories = DEFAULT_DIFFICULTY_CATEGORY;
  difficultiesCategories = DIFFICULTIES_CATEGORIES;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userPatientService: UserPatientService,
    private cookieService: CookieService
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUser = this.cookieService.getCurrentUser();
    this.loadPatientData();
  }

  private initializeForms(): void {
    this.patientForm = this.fb.group({
      name_patient: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone_number: [''],
      birthday: ['', [Validators.required]],
      allergies: [[]],
      difficulties: [[]],
      discapacity: [0],
      isactive: [1]
    });

    this.allergiesForm = this.fb.group({
      customAllergy: ['']
    });

    this.difficultiesForm = this.fb.group({
      customDifficulty: ['']
    });
  }

  private loadPatientData(): void {
    this.userPatientService.getUserPatientsByUser(this.currentUser.id_user).subscribe({
      next: (patients) => {
        const patient = patients.find(p => p.id === this.patientId);
        if (patient) {
          this.selectedAllergies = patient.allergies || [];
          this.selectedDifficulties = patient.difficulties || [];
          this.patientForm.patchValue({
            ...patient,
            allergies: this.selectedAllergies,
            difficulties: this.selectedDifficulties
          });
        }
      },
      error: (error) => console.error('Error loading patient:', error)
    });
  }

  getAllergiesByCategory(category: keyof AllergyCategories): string[] {
    return this.allergiesCategories[category];
  }

  getCategories(): Array<keyof AllergyCategories> {
    return Object.keys(this.allergiesCategories) as Array<keyof AllergyCategories>;
  }

  toggleAllergyModal(): void {
    this.showAllergiesModal = !this.showAllergiesModal;
  }

  toggleAllergy(allergy: string): void {
    const index = this.selectedAllergies.indexOf(allergy);
    if (index > -1) {
      this.selectedAllergies.splice(index, 1);
    } else {
      this.selectedAllergies.push(allergy);
    }
    this.patientForm.patchValue({
      allergies: this.selectedAllergies
    });
  }

  addCustomAllergy(): void {
    const value = this.allergiesForm.get('customAllergy')?.value;
    if (value?.trim()) {
      this.selectedAllergies.push(value.trim());
      this.allergiesForm.patchValue({ customAllergy: '' });
      this.patientForm.patchValue({
        allergies: this.selectedAllergies
      });
    }
  }

  getDifficultiesByCategory(category: keyof DifficultiesCategories): string[] {
    return this.difficultiesCategories[category];
  }

  getDifficultyCategories(): Array<keyof DifficultiesCategories> {
    return Object.keys(this.difficultiesCategories) as Array<keyof DifficultiesCategories>;
  }

  toggleDifficultyModal(): void {
    this.showDifficultiesModal = !this.showDifficultiesModal;
  }

  toggleDifficulty(difficulty: string): void {
    const index = this.selectedDifficulties.indexOf(difficulty);
    if (index > -1) {
      this.selectedDifficulties.splice(index, 1);
    } else {
      this.selectedDifficulties.push(difficulty);
    }
    this.patientForm.patchValue({
      difficulties: this.selectedDifficulties
    });
  }

  addCustomDifficulty(): void {
    const value = this.difficultiesForm.get('customDifficulty')?.value;
    if (value?.trim()) {
      this.selectedDifficulties.push(value.trim());
      this.difficultiesForm.patchValue({ customDifficulty: '' });
      this.patientForm.patchValue({
        difficulties: this.selectedDifficulties
      });
    }
  }

  getDiscapacityValue(): number {
    return this.patientForm.get('discapacity')?.value || 0;
  }

  getDiscapacityColor(): string {
    const value = this.getDiscapacityValue();
    if (value < 33) return 'bg-green-500';
    if (value < 66) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  navigateToFamily(): void {
    this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.FAMILY]);
  }

  onSubmit(): void {
    if (this.patientForm.valid && !this.isSubmitting) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas actualizar este familiar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isSubmitting = true;
          const patientData = {
            ...this.patientForm.value,
            id_user: this.currentUser.id_user,
            updatedat: new Date().toISOString()
          };

          this.userPatientService.updateUserPatient(this.patientId, patientData).subscribe({
            next: () => {
              Swal.fire({
                title: '¡Actualizado!',
                text: 'El familiar ha sido actualizado exitosamente.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              }).then(() => this.navigateToFamily());
            },
            error: (error) => {
              console.error('Error updating patient:', error);
              Swal.fire('Error', 'No se pudo actualizar el familiar.', 'error');
              this.isSubmitting = false;
            }
          });
        }
      });
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos correctamente.', 'warning');
    }
  }
}