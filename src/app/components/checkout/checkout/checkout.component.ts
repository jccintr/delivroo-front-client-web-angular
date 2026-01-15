import { Component, inject, OnInit, signal } from '@angular/core';
import { CheckoutHeaderComponent } from "../checkout-header/checkout-header.component";
import { CheckoutCustomerComponent } from "../checkout-customer/checkout-customer.component";
import { CheckoutDeliveryComponent } from "../checkout-delivery/checkout-delivery.component";
import { HSpacerComponent } from "../../h-spacer/h-spacer.component";
import { CheckoutPaymentComponent } from "../checkout-payment/checkout-payment.component";
import { CheckoutInstructionsComponent } from "../checkout-instructions/checkout-instructions.component";
import { CheckoutSummaryComponent } from "../checkout-summary/checkout-summary.component";
import { Payment, PaymentService } from '../../../services/payment.service';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Fee, FeeService } from '../../../services/fee.service';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule, 
    CheckoutHeaderComponent, 
    CheckoutCustomerComponent, 
    CheckoutDeliveryComponent, 
    HSpacerComponent, 
    CheckoutPaymentComponent, 
    CheckoutInstructionsComponent, 
    CheckoutSummaryComponent
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartItems$!: Observable<CartItem[]>;
  private paymentService = inject(PaymentService);
  private feeService = inject(FeeService);
 
  name = signal('');
  phone = signal('');
  delivery = signal(true);
  address = signal('');
  instructions = signal('');
  payments = this.paymentService.payments;
  fees = this.feeService.fees;

  selectedPayment = signal<Payment | null>(null);
  selectedFee = signal<Fee | null>(null);

  constructor(public cartService: CartService,) {
    this.cartItems$ = this.cartService.cart$;
  }
  

  onSetDelivery(value: boolean) {
     this.delivery.set(value);
  }

  onPaymentSelected(payment: Payment) {
    this.selectedPayment.set(payment);
    console.log('Forma de pagamento selecionada:', payment);
  }

  onFeeSelected(fee: Fee) {

    this.selectedFee.set(fee);
    console.log('Bairro selecionado:', fee);
   
  }

}
