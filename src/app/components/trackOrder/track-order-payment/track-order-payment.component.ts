import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-track-order-payment',
  imports: [],
  templateUrl: './track-order-payment.component.html',
  styleUrl: './track-order-payment.component.css'
})
export class TrackOrderPaymentComponent {

   @Input() payment: string = '';
}
