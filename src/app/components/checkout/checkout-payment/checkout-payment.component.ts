import { Component, input, OnInit, output, signal } from '@angular/core';
import { Payment } from '../../../services/payment.service';


@Component({
  selector: 'app-checkout-payment',
  imports: [],
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css'
})
export class CheckoutPaymentComponent implements OnInit {
   
   payments = input<Payment[]>([]);

   // Output: emite a seleção sempre que o usuário muda a opção
  paymentSelected = output<Payment>();

  // Signal interno para controlar qual opção está selecionada
  selectedPayment = input<Payment | null>(null);  // opcional: se quiser passar valor inicial

  // Valor interno (se não passar selectedPayment de fora)
  private _selected = signal<Payment | null>(null);

  ngOnInit() {
    // Se não houver valor inicial vindo de fora, seleciona o primeiro (se existir)
    if (this.payments().length > 0 && !this.selectedPayment()) {
      this._selected.set(this.payments()[0]);
      this.emitSelection();
    }
  }

  onPaymentChange(payment: Payment) {
    this._selected.set(payment);
    this.emitSelection();
  }

  private emitSelection() {
    const selected = this._selected();
    if (selected) {
      this.paymentSelected.emit(selected);
    }
  }

  // Helper para verificar se está selecionado (usado no template)
  isSelected(payment: Payment): boolean {
    return this._selected()?.id === payment.id;
  }
}
