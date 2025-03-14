import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsMapComponent } from '../../shared/components/rooms/rooms-map/rooms-map.component'; 


const routes: Routes = [
  { 
    path: 'map', 
    component: RoomsMapComponent 
  },
  { 
    path: '', 
    redirectTo: 'map', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }