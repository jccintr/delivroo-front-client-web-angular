import { Component } from '@angular/core';
import { CartHeaderComponent } from "../cart-header/cart-header.component";
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CartItem, CartService } from '../../../services/cart.service';
import { CartTotalComponent } from "../cart-total/cart-total.component";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { CartCheckoutComponent } from "../cart-checkout/cart-checkout.component";
import { CartEmptyComponent } from "../cart-empty/cart-empty.component";

@Component({
  selector: 'app-cart',
  imports: [CartHeaderComponent, CartItemComponent, CartTotalComponent, CommonModule, CartCheckoutComponent, CartEmptyComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent{
  cartItems$!: Observable<CartItem[]>;

  constructor(public cartService: CartService,private location: Location) {
    this.cartItems$ = this.cartService.cart$;
  }

  back(){
    this.location.back();
  }

 
 
}
