import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-extra-item',
  imports: [],
  templateUrl: './product-extra-item.component.html',
  styleUrl: './product-extra-item.component.css'
})
export class ProductExtraItemComponent {

  @Input() extra: any = {};
}
