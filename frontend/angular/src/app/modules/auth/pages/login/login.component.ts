import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UserService } from '../../../../core/services/auth/user.service';

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
            Swal.fire({
              icon: 'success',
              title: '¡Bienvenido!',
              text: 'Inicio de sesión exitoso',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/dashboard']);
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error en el inicio de sesión',
            text: error.error.message || 'Credenciales inválidas',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#f67280'
          });
        }
      });
    }
  }
}