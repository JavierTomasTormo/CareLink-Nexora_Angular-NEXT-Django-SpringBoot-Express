import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsInterfaceComponent } from '../../shared/components/rooms/rooms-interface/rooms-interface.component';
import { InteractiveMapComponent } from '../../shared/components/rooms/interactive-map/interactive-map.component';


const routes: Routes = [
  { 
    path: 'view', 
    component: InteractiveMapComponent 
  },
  { 
    path: 'view/map', 
    component: RoomsInterfaceComponent 
  },
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
export class RoomsRoutingModule { }