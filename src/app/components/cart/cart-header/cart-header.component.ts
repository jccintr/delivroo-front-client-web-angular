import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { CartClearDialogComponent } from "../cart-clear-dialog/cart-clear-dialog.component";

@Component({
  selector: 'app-cart-header',
  imports: [CartClearDialogComponent],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.css'
})
export class CartHeaderComponent {
  mostrarDialogLimpar = false;

constructor(private location: Location,private cartService: CartService) {}

 back(){
    this.location.back();
  }

  limparCarrinho() {
    if (confirm('Deseja realmente limpar todo o carrinho?')) {
      this.cartService.limparCarrinho();
    }
  }

  abrirDialogLimpar() {
    this.mostrarDialogLimpar = true;
  }

  onConfirmarLimpar() {
    this.cartService.limparCarrinho();
    this.mostrarDialogLimpar = false;
  }

  onCancelarLimpar() {
    this.mostrarDialogLimpar = false;
  }

  hasItems(): boolean {
    
    return this.cartService.getQuantidadeItens()>0?  true : false;
   
  }

}
