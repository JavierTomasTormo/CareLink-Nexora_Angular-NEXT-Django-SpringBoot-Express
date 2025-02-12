import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from '../../shared/components/profile/profileView/profile-view.component'; // Actualiza la ruta
import { FamilyViewComponent } from '../../shared/components/profile/family-view/family-view.component'; // Actualiza la ruta
import { PaymentsViewComponent } from '../../shared/components/profile/payments-view/payments-view.component'; // Actualiza la ruta
import { BookingsViewComponent } from '../../shared/components/profile/bookings-view/bookings-view.component'; // Actualiza la ruta


const routes: Routes = [
  { 
    path: 'view', 
    component: ProfileViewComponent 
  },
  {
    path: 'family/view',
    component: FamilyViewComponent
  },
  {
    path: 'reservations/view',
    component: BookingsViewComponent
  },
  {
    path: 'payments/view',
    component: PaymentsViewComponent
  },

  // { 
  //   path: 'register', 
  //   component: RegisterComponent 
  // },
  // {
  //   path: 'logout',
  //   component: LogoutComponent
  // },
  { 
    path: '', 
    redirectTo: 'view', 
    pathMatch: 'full' 
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }