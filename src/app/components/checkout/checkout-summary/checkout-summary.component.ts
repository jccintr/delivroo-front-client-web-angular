import { Component, Input } from '@angular/core';
import { CartItem, CartService } from '../../../services/cart.service';
import { Fee } from '../../../services/fee.service';

@Component({
  selector: 'app-checkout-summary',
  imports: [],
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.css'
})
export class CheckoutSummaryComponent {

  @Input() items!: CartItem[] | null;
  @Input() delivery!: boolean;
  @Input() selectedFee: Fee | null = null;

  constructor(public cartService: CartService) {
      
  }

 

  getTotalPedido(): number {
    const subtotal = this.cartService.getValorTotal();
    if (!this.delivery) {
      return subtotal;
    }
    // Use ?? 0 para evitar NaN se selectedFee for null
    const taxa = Number(this.selectedFee?.valor ?? 0);
    return taxa + subtotal;
  }


}
