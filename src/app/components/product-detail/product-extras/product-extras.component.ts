import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductExtraItemComponent } from "../product-extra-item/product-extra-item.component";

@Component({
  selector: 'app-product-extras',
  imports: [ProductExtraItemComponent],
  templateUrl: './product-extras.component.html',
  styleUrl: './product-extras.component.css'
})
export class ProductExtrasComponent {

@Input() extras: any[] = [];

@Output() totalExtrasChange = new EventEmitter<number>();

private selectedExtrasTotal: number = 0;

onExtraToggled(change: { valor: number; selected: boolean }) {
    if (change.selected) {
      this.selectedExtrasTotal += change.valor;
    } else {
      this.selectedExtrasTotal -= change.valor;
    }

   
    if (this.selectedExtrasTotal < 0) this.selectedExtrasTotal = 0;

    this.totalExtrasChange.emit(this.selectedExtrasTotal);
  }
}
