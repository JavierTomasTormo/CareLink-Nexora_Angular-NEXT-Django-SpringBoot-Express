import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../core/services/token/token.service';
import { UserService } from '../../../../core/services/auth/user.service';
import { SHARED_ROUTES } from '../../../../core/constants/shared.routes';
import { User } from '../../../../core/models/Users/user.model';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    menuOpen = false;
    routes = SHARED_ROUTES;
    profileMenuOpen = false;
    user!: User;
    
    constructor(
        public tokenService: TokenService,
        private userService: UserService,
    ) {}
    
    
    ngOnInit() {
        if (this.tokenService.isAuthenticated()) {
            const userInfo = this.tokenService.getUserInfo();
            if (userInfo) {
                this.user = userInfo;
            }
        }
    }

    toggleProfileMenu() {
        // console.log('toggleProfileMenu called', this.user);
        this.profileMenuOpen = !this.profileMenuOpen;
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    logout() {
        this.userService.logout();
        this.tokenService.clearAll();
        window.location.href = this.routes.NEXT.HOME;
    }
}
