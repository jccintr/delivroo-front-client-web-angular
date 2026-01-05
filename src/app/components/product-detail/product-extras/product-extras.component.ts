import { Component, Input } from '@angular/core';
import { ProductExtraItemComponent } from "../product-extra-item/product-extra-item.component";

@Component({
  selector: 'app-product-extras',
  imports: [ProductExtraItemComponent],
  templateUrl: './product-extras.component.html',
  styleUrl: './product-extras.component.css'
})
export class ProductExtrasComponent {

@Input() extras: any[] = [];
}
