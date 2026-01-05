import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-add',
  imports: [],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {

   @Input() quantity: number = 1;
   @Input() productTotal: number = 0;
   @Output() quantityChange = new EventEmitter<number>();

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
}
