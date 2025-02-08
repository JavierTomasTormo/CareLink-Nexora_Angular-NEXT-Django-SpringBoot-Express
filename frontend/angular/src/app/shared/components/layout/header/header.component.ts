import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../core/services/token/token.service';
import { UserService } from '../../../../core/services/auth/user.service';
import { SHARED_ROUTES } from '../../../../core/constants/shared.routes';

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
    
    constructor(
        public tokenService: TokenService,
        private userService: UserService,
    ) {}
    
    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    logout() {
        this.userService.logout();
        this.tokenService.clearAll();
        window.location.href = this.routes.NEXT.HOME;
    }
}

// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

// @Component({
//     selector: 'app-header',
//     standalone: true,
//     imports: [RouterModule],
//     templateUrl: './header.component.html',
//     styleUrls: ['./header.component.scss']
// })
// export class HeaderComponent {
//     menuOpen = false;
    
//     toggleMenu() {
//         this.menuOpen = !this.menuOpen;
//     }
// }