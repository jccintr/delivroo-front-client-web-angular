import { Component, input } from '@angular/core';
import { Payment } from '../../../services/payment.service';


@Component({
  selector: 'app-checkout-payment',
  imports: [],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export class CheckoutPaymentComponent {
   
   payments = input<Payment[]>([]);
}
