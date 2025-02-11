import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/components/error/error.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  {
    path: 'payments',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule)  // Usando carga perezosa (lazy loading)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  // {
  //   path: 'medical',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./modules/medical/medical.routes').then(m => m.MEDICAL_ROUTES)
  // },
  // {
  //   path: 'emergency',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./modules/emergency/emergency.routes').then(m => m.EMERGENCY_ROUTES)
  // },
  // {
  //   path: 'reports',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./modules/reports/reports.routes').then(m => m.REPORTS_ROUTES)
  // },
  { 
    path: '404', 
    component: ErrorComponent 
  },
  { 
    path: '**', 
    redirectTo: '404' 
  },
  // {//ESTO ES UN CASO DE USO PARA EL AUTHGUARD CUANDO TENGAMOS ALGO HAY QUE IMPLEMENTAR EL GUARD EN TODO
  //   path: 'dashboard',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  // }
];
