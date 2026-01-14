import { Component, inject, signal } from '@angular/core';
import { CheckoutHeaderComponent } from "../checkout-header/checkout-header.component";
import { CheckoutCustomerComponent } from "../checkout-customer/checkout-customer.component";
import { CheckoutDeliveryComponent } from "../checkout-delivery/checkout-delivery.component";
import { HSpacerComponent } from "../../h-spacer/h-spacer.component";
import { CheckoutPaymentComponent } from "../checkout-payment/checkout-payment.component";
import { CheckoutInstructionsComponent } from "../checkout-instructions/checkout-instructions.component";
import { CheckoutSummaryComponent } from "../checkout-summary/checkout-summary.component";
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [CheckoutHeaderComponent, CheckoutCustomerComponent, CheckoutDeliveryComponent, HSpacerComponent, CheckoutPaymentComponent, CheckoutInstructionsComponent, CheckoutSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  private paymentService = inject(PaymentService);
  name = signal('');
  phone = signal('');
  delivery = signal(true);
  address = signal('');
  instructions = signal('');
  payments = this.paymentService.payments;
  onSetDelivery(value: boolean) {
    this.delivery.set(value);
  }

}
