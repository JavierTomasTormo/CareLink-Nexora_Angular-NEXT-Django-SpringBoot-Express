import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UserService } from '../../../../core/services/auth/user.service';
import { TokenService } from '../../../../core/services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private tokenService: TokenService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.errors && (control.dirty || control.touched || this.submitted)) {
      if (control.errors['required']) return `El campo ${field} es obligatorio`;
      if (control.errors['email']) return 'Email no válido';
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            console.log(response);

            this.tokenService.setTokens(response.accessToken, response.refreshToken);
            this.tokenService.setUserInfo(response.user);
            
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido a VitalNest!',
              text: `¡Nos alegra verte de nuevo, ${response.user.name}!`,
              background: '#f8f9fa',
              confirmButtonText: 'Continuar',
              confirmButtonColor: '#4CAF50',
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              customClass: {
                title: 'text-success',
                popup: 'border-radius-lg'
              },
              timer: 2500,
              timerProgressBar: true
            }).then(() => {
              this.router.navigate(['/dashboard']);
            });
          }
        },
        error: (error) => {
            Swal.fire({
            icon: 'error',
            title: '¡Ups! Algo salió mal',
            text: error.error.message || 'Las credenciales no son correctas',
            background: '#f8f9fa',
            confirmButtonText: 'Intentar de nuevo',
            confirmButtonColor: '#dc3545',
            showClass: {
              popup: 'animate__animated animate__shakeX'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOut'
            },
            customClass: {
              title: 'text-danger fw-bold',
              popup: 'border-radius-lg shadow-lg',
              confirmButton: 'btn-lg'
            },
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: true
            });
        }
      });
    }
  }
}