import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../../../core/services/token/token.service';

@Component({
  selector: 'app-logout',
  template: '', // no necesitamos template ya que es solo funcional
  standalone: true
})
export class LogoutComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tokenService.clearAll();
    this.router.navigate(['/auth/login']);
  }
}