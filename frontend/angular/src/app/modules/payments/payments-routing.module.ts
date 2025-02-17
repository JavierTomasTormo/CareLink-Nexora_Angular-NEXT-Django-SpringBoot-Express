import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from '../../shared/components/payments/payments.component';  

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
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PaymentsRoutingModule { }
