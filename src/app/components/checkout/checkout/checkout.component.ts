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
import { FinalizeOrderComponent } from "../finalize-order/finalize-order.component";
import { AlertDialogComponent } from "../../alert-dialog/alert-dialog.component";
import { Router } from '@angular/router';

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
    CheckoutSummaryComponent,
    FinalizeOrderComponent,
    AlertDialogComponent
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
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

  showAlertDialog = false

  showValidationError = signal(false);
  validationErrorMessage = signal('');

  selectedPayment = signal<Payment | null>(null);
  selectedFee = signal<Fee | null>(null);

  constructor(public cartService: CartService,private router: Router) {
    this.cartItems$ = this.cartService.cart$;
  }

  ngOnInit(): void {
    this.loadCustomerInfo();
  }

  private loadCustomerInfo(): void {
    const savedData = localStorage.getItem('customerInfo');
    
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        console.log(data)
        // Atualiza os signals (o formulário reage automaticamente)
        if (data.name) {
          this.name.set(data.name);
        }
        if (data.phone) {
          setTimeout(() => {
          this.phone.set(data.phone);
        }, 0);
        }
        if (data.address) {
          this.address.set(data.address);
        }
        
        // Opcional: log para debug
         console.log('Dados do cliente carregados:', data);
      } catch (e) {
        console.warn('Erro ao parsear customerInfo do localStorage', e);
      }
    }
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

  saveCustomerInfo(): void {
     const data = { name: this.name(),phone: this.phone(), address: this.address() };
     localStorage.setItem('customerInfo', JSON.stringify(data));
  }

  sendOrder() {

    if(!this.name().trim()) {
      this.validationErrorMessage.set('Por favor, informe o seu nome.');
      this.showAlertDialog = true;
      return;
    }

    if(!this.phone().trim()) {
      this.validationErrorMessage.set('Por favor, informe o seu número de telefone.');
      this.showAlertDialog = true;
      return;
    }

    if(this.delivery() && !this.address().trim()) {
      this.validationErrorMessage.set('Por favor, informe o endereço de entrega.');
      this.showAlertDialog = true;
      return;
    }
    this.saveCustomerInfo();
    console.log('Pedido sendo enviado...');
    console.log('Dados do pedido:', {
      name: this.name(),
      phone: this.phone(),
      delivery: this.delivery(),
      address: this.address(),
      instructions: this.instructions(),
      payment: this.selectedPayment(),
      fee: this.selectedFee(),
   
     });
     this.validationErrorMessage.set('Pedido Enviado !');
     this.showAlertDialog = true;
     this.router.navigate(['/success']); 
    // Aqui você implementará depois a lógica real de envio (API, etc)
}

closeAlertDialog(){
  this.showAlertDialog = false;
}

}
