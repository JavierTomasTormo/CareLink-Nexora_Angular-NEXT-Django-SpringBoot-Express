import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../../../core/services/token/token.service';
import { UserService } from '../../../../core/services/auth/user.service';
import { SHARED_ROUTES } from '../../../../core/constants/shared.routes';
import { User } from '../../../../core/models/Users/user.model';
import { SearchComponent } from '../../layout/search/search.component'; 

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule, CommonModule, SearchComponent],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @ViewChild('profileRef') profileRef!: ElementRef;
    @ViewChild('searchRef') searchRef!: ElementRef;
    @ViewChild('notificationsRef') notificationsRef!: ElementRef;
  
    menuOpen = false;
    routes = SHARED_ROUTES;
    profileMenuOpen = false;
    searchOpen = false;
    notificationsOpen = false;
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
        // console.log(this.user, this.routes);
    }

    @HostListener('document:mousedown', ['$event'])
    onClickOutside(event: MouseEvent) {
        // Cerrar menú de perfil al hacer clic fuera
        if (this.profileRef && !this.profileRef.nativeElement.contains(event.target)) {
            this.profileMenuOpen = false;
        }
        
        // Cerrar búsqueda al hacer clic fuera
        if (this.searchRef && !this.searchRef.nativeElement.contains(event.target)) {
            this.searchOpen = false;
        }
        
        // Cerrar notificaciones al hacer clic fuera
        if (this.notificationsRef && !this.notificationsRef.nativeElement.contains(event.target)) {
            this.notificationsOpen = false;
        }
    }

    toggleProfileMenu() {
        this.profileMenuOpen = !this.profileMenuOpen;
        // Cerrar otros menús
        this.searchOpen = false;
        this.notificationsOpen = false;
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    toggleSearch() {
        this.searchOpen = !this.searchOpen;
        // Cerrar otros menús
        this.profileMenuOpen = false;
        this.notificationsOpen = false;
    }

    toggleNotifications(event: Event) {
        event.preventDefault();
        this.notificationsOpen = !this.notificationsOpen;
        // Cerrar otros menús
        this.profileMenuOpen = false;
        this.searchOpen = false;
        console.log('Notificaciones:', this.notificationsOpen);
    }

    logout() {
        this.userService.logout();
        this.tokenService.clearAll();
        window.location.href = this.routes.NEXT.HOME;
    }
}