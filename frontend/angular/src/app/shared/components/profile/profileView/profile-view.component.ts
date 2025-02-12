import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from '../../../../core/services/cookies/cookie.service';
import { User } from '../../../../core/models/Users/user.model';
import { UserService } from '../../../../core/services/auth/user.service';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';


@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileTabsComponent],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {
  user!: User;
  isEditing: boolean = false;
  isLoading: boolean = false;
  baseProfileUrl: string = 'https://api.dicebear.com/7.x/lorelei/svg?seed=';
  profileSlug: string = ''; 
  activeTab: string = 'profile';

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    ) {
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


  setActiveTab(activeTab: string): void {
    console.log('Active tab changed to:', activeTab);
    this.activeTab = activeTab;
  }

  onSubmit(): void {
    this.isLoading = true;
    // console.log(this.cookieService.getCookies());

    this.user.profile_img = this.baseProfileUrl + this.profileSlug; 

    this.userService.updateUser(this.user.id_user, this.user).subscribe(
      updatedUser => {
        const updatedUserWithIdUser = {
          ...updatedUser,
          id_user: updatedUser.id ?? this.user.id_user,
        };
        this.user = updatedUserWithIdUser;
        this.cookieService.setCookies(
          this.cookieService.getAccessCookie()!,
          this.cookieService.getRefreshCookie()!,
          updatedUserWithIdUser
        );
        this.isEditing = false;
        this.isLoading = false;
      },
      error => {
        console.error('Error actualizando el usuario:', error);
        this.isLoading = false;
      }
    );
  }
}
