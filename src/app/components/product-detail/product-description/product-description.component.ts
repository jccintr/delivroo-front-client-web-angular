import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-description',
  imports: [],
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent {

   @Input() name: string = '';
   @Input() description: string = '';
   @Input() price: string = '';
   @Input() waitTime: string = '';

}
