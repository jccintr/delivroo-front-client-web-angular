import { Component, inject, OnInit, signal } from '@angular/core';
import { CheckoutHeaderComponent } from "../checkout-header/checkout-header.component";
import { CheckoutCustomerComponent } from "../checkout-customer/checkout-customer.component";
import { CheckoutDeliveryComponent } from "../checkout-delivery/checkout-delivery.component";
import { HSpacerComponent } from "../../h-spacer/h-spacer.component";
import { CheckoutPaymentComponent } from "../checkout-payment/checkout-payment.component";
import { CheckoutInstructionsComponent } from "../checkout-instructions/checkout-instructions.component";
import { CheckoutSummaryComponent } from "../checkout-summary/checkout-summary.component";
import { Payment, PaymentService } from '../../../services/payment.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CartItem, CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Fee, FeeService } from '../../../services/fee.service';
import { FinalizeOrderComponent } from "../finalize-order/finalize-order.component";
import { AlertDialogComponent } from "../../alert-dialog/alert-dialog.component";
import { Router } from '@angular/router';
import { OrderData, OrderResponse, StoreService } from '../../../services/store.service';

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
  isSendingOrder = signal(false);
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

  constructor(public cartService: CartService,private router: Router,private storeService: StoreService) {
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

  onFeeSelected(fee: Fee | null) {
    this.selectedFee.set(fee);
    console.log('Bairro selecionado:', fee);
  }
  saveCustomerInfo(): void {
     const data = { name: this.name(),phone: this.phone(), address: this.address() };
     localStorage.setItem('customerInfo', JSON.stringify(data));
  }

  async sendOrder() {

    if (this.isSendingOrder()) return;
   

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

     if(this.delivery() && !this.selectedFee()) {
      this.validationErrorMessage.set('Por favor, selecione o seu bairro.');
      this.showAlertDialog = true;
      return;
    }


    this.saveCustomerInfo();
    console.log('Pedido sendo enviado...');
    this.isSendingOrder.set(true);
    const itensPedido = await firstValueFrom(this.cartItems$);

    const orderData : OrderData = {
      tenant_id: this.storeService.getStoreId(),
      nome: this.name(),
      telefone: this.phone(),
      delivery: this.delivery(),
      endereco: this.address(),
      taxa_id: this.selectedFee()?.id,
      pagamento_id: this.selectedPayment()?.id,
      observacao: this.instructions(),
      itensPedido: itensPedido  
     };
     console.log('Request do pedido:', orderData);
     // enviar o pedido chamando createOrder do StoreService
     try {
        const response: OrderResponse = await firstValueFrom(this.storeService.createOrder(orderData));
        this.isSendingOrder.set(false);
        console.log('Resposta do pedido:', response);
        //limpar o carrinho e salvar o id do pedido no localStorage
        this.cartService.limparCarrinho();
        localStorage.setItem('lastOrderId', response.id.toString());
        //navegar para a página de sucesso
        this.router.navigate(['/success'],{state: {pix: response.forma_pagamento==='Pix'?true:false}}); //passar a flag pix para success
     } catch (error) {    
        console.error('Erro ao enviar o pedido:', error);
        this.validationErrorMessage.set('Erro ao enviar o pedido. Por favor, tente novamente.');
        this.showAlertDialog = true;
        return;
    }

}

closeAlertDialog(){
  this.showAlertDialog = false;
}

}
