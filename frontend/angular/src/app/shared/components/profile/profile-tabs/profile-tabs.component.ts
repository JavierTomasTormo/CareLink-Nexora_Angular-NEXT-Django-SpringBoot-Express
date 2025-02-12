import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SHARED_ROUTES } from '../../../../core/constants/shared.routes';


@Component({
  selector: 'app-profile-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-tabs.component.html',
  styleUrls: ['./profile-tabs.component.css']
})
export class ProfileTabsComponent {
  @Input() activeTab?: string = 'profile';
  @Output() tabChange = new EventEmitter<string>();

  constructor(private router: Router) {}

  changeTab(activeTab: string) {
    this.tabChange.emit(activeTab);
    this.navigateToTab(activeTab);
  }

  navigateToTab(tab: string): void {
    switch (tab) {
      case 'profile':
        this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.PROFILE]);
        break;
      case 'family':
        this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.FAMILY]);
        break;
      case 'reservations':
        this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.RESERVATIONS]);
        break;
      case 'payments':
        this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.PAYMENTS]);
        break;
      default:
        this.router.navigate([SHARED_ROUTES.ANGULAR.AUTH.PROFILE]);
        break;
    }
  }
}