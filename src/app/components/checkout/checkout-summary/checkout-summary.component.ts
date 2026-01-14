import { Component, Input } from '@angular/core';
import { CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout-summary',
  imports: [],
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.css'
})
export class CheckoutSummaryComponent {

  @Input() items!: CartItem[] | null;

}
