import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from '../../../../core/services/cookies/cookie.service';
import { User } from '../../../../core/models/Users/user.model';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {
  user!: User;
  isEditing: boolean = false;
  isLoading: boolean = false;
  baseProfileUrl: string = 'https://api.dicebear.com/7.x/lorelei/svg?seed=';
  profileSlug: string = ''; 

  constructor(private cookieService: CookieService) {
    this.user = this.cookieService.getCurrentUser();
    this.extractProfileSlug();
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  extractProfileSlug(): void {
    if (this.user.profile_img) {
      this.profileSlug = this.user.profile_img.replace(this.baseProfileUrl, '');
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.user.profile_img = this.baseProfileUrl + this.profileSlug; // Construir URL final

    // Simulación de actualización con delay
    setTimeout(() => {
      console.log('Usuario actualizado:', this.user);
      this.isEditing = false;
      this.isLoading = false;
    }, 1500);
  }
}
