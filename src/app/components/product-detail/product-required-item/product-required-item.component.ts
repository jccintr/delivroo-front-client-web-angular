import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-required-item',
  imports: [],
  templateUrl: './product-required-item.component.html',
  styleUrl: './product-required-item.component.css'
})
export class ProductRequiredItemComponent {
  
 @Input() item: any = {};
 
}
