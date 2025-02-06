import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../../core/services/auth/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    HttpClientModule
  ],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

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
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        profile_img: ['']
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

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario enviado:', this.registerForm.value);
    }
    // if (this.registerForm.valid) {
    //   this.userService.register(this.registerForm.value).subscribe({
    //     next: (response) => {
    //       if (response.status === 'success') {
    //         this.router.navigate(['/auth/login']);
    //       }
    //     },
    //     error: (error) => {
    //       console.error('Error en registro:', error);
    //     }
    //   });
    // }
  }
}