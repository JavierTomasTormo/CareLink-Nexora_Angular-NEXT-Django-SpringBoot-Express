import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../core/services/auth/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    HttpClientModule,
    RouterModule
  ],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    submitted = false;
    errorMessage = '';
    showPassword = false;
    showConfirmPassword = false;


    constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
    ) {}

    ngOnInit() {
      this.registerForm = this.fb.group({
          name: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone_number: ['', Validators.required],
          birthdate: ['', Validators.required],
          address: ['', Validators.required],
          password: ['', [
              Validators.required, 
              Validators.minLength(8),
              Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)]
            ],
          confirmPassword: ['', Validators.required],
          profile_img: ['']
        });

        // Listen for changes in password and confirm password fields
        this.registerForm.get('confirmPassword')?.valueChanges.subscribe(confirmValue => {
          const passwordValue = this.registerForm.get('password')?.value;
          if (confirmValue !== passwordValue) {
            this.registerForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
          } else {
            this.registerForm.get('confirmPassword')?.setErrors(null);
          }
        });

        // Escuchar cambios en el campo email
        this.registerForm.get('email')?.valueChanges.subscribe(email => {
          if (email) {
            this.registerForm.patchValue({
              profile_img: `https://api.dicebear.com/7.x/lorelei/svg?seed=${email}`
            });
          }
        });
    }


    getErrorMessage(field: string): string {
      const control = this.registerForm.get(field);
      if (control?.errors && (control.dirty || control.touched || this.submitted)) {
        if (control.errors['required']) return `El campo ${field} es obligatorio`;
        if (control.errors['email']) return 'Email no válido';
        if (control.errors['minlength']) return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
        if (control.errors['pattern']) {
          if (field === 'password') return 'La contraseña debe contener mayúsculas, números y símbolos';
          if (field === 'phone_number') return 'Teléfono no válido';
        }
      }
      return '';
    }

      onSubmit() {
        this.submitted = true;
        if (this.registerForm.valid) {
          this.userService.register(this.registerForm.value).subscribe({
            next: (response) => {
              if (response.status === 'success') {
                Swal.fire({
                  icon: 'success',
                  title: '¡Registro exitoso!',
                  text: 'Redirigiendo al login...',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  this.router.navigate(['/auth/login']);
                });
              }
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: error.error.message || 'Ha ocurrido un error inesperado',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#f67280'
              });
            }
          });
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Formulario inválido',
            text: 'Por favor, revisa todos los campos',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#f67280'
          });
        }
      }


      togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
        if (field === 'password') {
          this.showPassword = !this.showPassword;
        } else {
          this.showConfirmPassword = !this.showConfirmPassword;
        }
      }
  }