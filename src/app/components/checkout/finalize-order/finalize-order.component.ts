import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Fee } from '../../../services/fee.service';

@Component({
  selector: 'app-finalize-order',
  imports: [],
  templateUrl: './finalize-order.component.html',
  styleUrl: './finalize-order.component.css'
})
export class FinalizeOrderComponent {

  @Input() delivery!: boolean;
  @Input() selectedFee: Fee | null = null;
  @Output() confirmOrder = new EventEmitter<void>();

  constructor(public cartService: CartService) {
      
  }

  getTotalPedido(): number {
    return this.delivery ? Number(this.selectedFee?.valor) + this.cartService.getValorTotal() : this.cartService.getValorTotal();
  }

  onConfirm() {
    this.confirmOrder.emit();   // emite o evento para o componente pai
  }

}
