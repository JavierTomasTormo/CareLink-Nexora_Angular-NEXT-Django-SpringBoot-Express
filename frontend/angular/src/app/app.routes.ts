import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/components/error/error.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'auth/login', 
    pathMatch: 'full' 
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
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