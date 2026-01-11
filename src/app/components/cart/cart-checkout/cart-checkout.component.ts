import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-checkout',
  imports: [],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.css'
})
export class CartCheckoutComponent {

  constructor(private router: Router) {}

   goToCheckout() {
    this.router.navigate(['/checkout']); 
  }

}
