import { Component, signal } from '@angular/core';
import { CheckoutHeaderComponent } from "../checkout-header/checkout-header.component";
import { CheckoutCustomerComponent } from "../checkout-customer/checkout-customer.component";

@Component({
  selector: 'app-checkout',
  imports: [CheckoutHeaderComponent, CheckoutCustomerComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  name = signal('');
  phone = signal('');

}
