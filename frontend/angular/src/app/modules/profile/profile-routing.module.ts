import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './pages/profileView/profile-view.component';


const routes: Routes = [
  { 
    path: 'view', 
    component: ProfileViewComponent 
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