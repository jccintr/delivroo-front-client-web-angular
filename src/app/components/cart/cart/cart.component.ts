import { Component } from '@angular/core';
import { CartHeaderComponent } from "../cart-header/cart-header.component";
import { CartItemComponent } from "../cart-item/cart-item.component";

@Component({
  selector: 'app-cart',
  imports: [CartHeaderComponent, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
