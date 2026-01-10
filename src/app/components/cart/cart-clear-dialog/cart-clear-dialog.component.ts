import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cart-clear-dialog',
  imports: [CommonModule],
  templateUrl: './cart-clear-dialog.component.html',
  styleUrl: './cart-clear-dialog.component.css'
})
export class CartClearDialogComponent {
  
  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  fechar() {
    this.cancelado.emit();
  }

  confirmar() {
    this.confirmado.emit();
  }

}
