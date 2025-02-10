import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../../core/services/token/token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logout',
  template: '', // no necesitamos template ya que es solo funcional
  standalone: true
})
export class LogoutComponent implements OnInit {
    constructor(
      private tokenService: TokenService,
      private router: Router,
      private http: HttpClient
    ) {}
  
    ngOnInit() {
        const userInfo = JSON.parse(localStorage.getItem('UserInfo') || 'null');

        this.http.post('http://localhost:8000/api/auth/tutor/logout', {
            refresh_token: this.tokenService.getRefreshToken(),
            email: userInfo.email,
            id_user: userInfo.id_user
        }).subscribe({
                next: () => {
                    this.tokenService.clearAll();
                    this.router.navigate(['/auth/login']);
                },
                error: () => {
                    this.tokenService.clearAll();
                    this.router.navigate(['/auth/login']);
                }
            });
    }
}