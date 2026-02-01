import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pizza-add',
  imports: [],
  templateUrl: './pizza-add.component.html',
  styleUrl: './pizza-add.component.css'
})
export class PizzaAddComponent {

   @Input() quantity: number = 1;
   @Input() productTotal: number = 0;
   @Output() quantityChange = new EventEmitter<number>();
   @Output() addToCart = new EventEmitter<void>();

   increase() {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  onAddToCart() {

    this.addToCart.emit();
    
  }

}
