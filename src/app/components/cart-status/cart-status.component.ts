import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  imports: [],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent {
  private cartService = inject(CartService);
  private router = inject(Router);

  itensCount = computed(() => this.cartService.getQuantidadeTotalItens());
  valorTotal = computed(() => this.cartService.getValorTotal());

  mostrarCarrinho() {
    this.router.navigate(['/cart']); 
  }

  get showCartButton(): boolean {
    return this.itensCount() > 0;
  }

}
