import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from '../../shared/components/payments/payments.component';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    PaymentsRoutingModule
  ]
})
export class PaymentsModule { }
