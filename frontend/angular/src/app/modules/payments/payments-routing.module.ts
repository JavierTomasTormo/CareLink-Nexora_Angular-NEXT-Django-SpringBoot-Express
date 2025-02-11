import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from '../../shared/components/payments/payments.component';  // Asegúrate de que la ruta esté correcta

const routes: Routes = [
    { 
        path: 'view', 
        component: PaymentsComponent 
    },
    { 
        path: '', 
        redirectTo: 'view', 
        pathMatch: 'full' 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],  // Asegúrate de usar RouterModule.forChild() aquí
    exports: [RouterModule]
})
export class PaymentsRoutingModule { }
