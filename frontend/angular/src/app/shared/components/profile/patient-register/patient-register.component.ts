import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-patient-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})
export class PatientRegisterComponent implements OnInit {
  patientForm: FormGroup;
  allergiesForm: FormGroup;
  currentUser: any;

  showAllergiesModal = false;
  selectedAllergies: string[] = [];
  activeCategory: keyof AllergyCategories = DEFAULT_ACTIVE_CATEGORY;
  allergiesCategories = ALLERGIES_CATEGORIES;

  showDifficultiesModal = false;
  selectedDifficulties: string[] = [];
  activeDifficultyCategory: keyof DifficultiesCategories = DEFAULT_DIFFICULTY_CATEGORY;
  difficultiesCategories = DIFFICULTIES_CATEGORIES;
  difficultiesForm: FormGroup;
  isSubmitting = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userPatientService: UserPatientService,
    private cookieService: CookieService
  ) {
    this.currentUser = this.cookieService.getCurrentUser();
    this.patientForm = this.fb.group({
      name_patient: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
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

  ngOnInit(): void {

    this.patientForm.get('phone_number')?.valueChanges.subscribe(value => {
      if (!value) {
        this.patientForm.patchValue({
          phone_number: this.currentUser.phone_number
        });
      }
    });
  }

  navigateToFamily(): void {
    this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.FAMILY]);
  }

  // onSubmit(): void {
  //   if (this.patientForm.valid && !this.isSubmitting) {
  //     Swal.fire({
  //       title: '¿Estás seguro?',
  //       text: '¿Deseas registrar este familiar?',
  //       icon: 'question',
  //       showCancelButton: true,
  //       confirmButtonText: 'Sí, registrar',
  //       cancelButtonText: 'Cancelar',
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.isSubmitting = true;
  //         const patientData = {
  //           ...this.patientForm.value,
  //           id_user: this.currentUser.id_user,
  //           createdat: new Date(),
  //           updatedat: new Date()
  //         };

  //         this.userPatientService.createUserPatient(patientData).subscribe({
  //           next: () => {
  //             Swal.fire(
  //               '¡Registrado!',
  //               'El familiar ha sido registrado exitosamente.',
  //               'success'
  //             ).then(() => this.navigateToFamily());
  //           },
  //           error: (error) => {
  //             console.error('Error creating patient:', error);
  //             Swal.fire(
  //               'Error',
  //               'No se pudo registrar el familiar.',
  //               'error'
  //             );
  //             this.isSubmitting = false;
  //           },
  //           complete: () => {
  //             this.isSubmitting = false;
  //           }
  //         });
  //       }
  //     });
  //   }
  // }
  onSubmit(): void {
    if (this.patientForm.valid && !this.isSubmitting) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas registrar este familiar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, registrar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.isSubmitting = true;
          
          // Formatear datos
          const patientData = {
            ...this.patientForm.value,
            id_user: this.currentUser.id_user,
            email: this.patientForm.value.email || this.currentUser.email,
            phone_number: this.patientForm.value.phone_number || this.currentUser.phone_number,
            allergies: this.selectedAllergies,
            difficulties: this.selectedDifficulties,
            createdat: new Date().toISOString(),
            updatedat: new Date().toISOString()
          };

          this.userPatientService.createUserPatient(patientData).subscribe({
            next: () => {
              Swal.fire({
                title: '¡Registrado!',
                text: 'El familiar ha sido registrado exitosamente.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              }).then(() => this.navigateToFamily());
            },
            error: (error) => {
              console.error('Error creating patient:', error);
              let errorMessage = 'No se pudo registrar el familiar.';
              
              if (error.error) {
                const errors = [];
                if (error.error.email) errors.push('Email: ' + error.error.email);
                if (error.error.phone_number) errors.push('Teléfono: ' + error.error.phone_number);
                if (errors.length > 0) {
                  errorMessage = errors.join('\n');
                }
              }

              Swal.fire('Error', errorMessage, 'error');
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