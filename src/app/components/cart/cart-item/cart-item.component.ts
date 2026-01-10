import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../../services/cart.service';
import { StoreService } from '../../../services/store.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  
  @Input() item!: CartItem;
  
  @Output() remove = new EventEmitter<number>();
  @Output() updateQuantity = new EventEmitter<{ id: number; quantidade: number }>();

  constructor(public storeService: StoreService) {}

  incrementar() {
    this.updateQuantity.emit({
      id: this.item.id,
      quantidade: this.item.quantidade + 1
    });
  }

  decrementar() {
    if (this.item.quantidade > 1) {
      this.updateQuantity.emit({
        id: this.item.id,
        quantidade: this.item.quantidade - 1
      });
    }
  }

  excluir() {
    this.remove.emit(this.item.id);
  }

}
