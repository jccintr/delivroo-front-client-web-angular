import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pizza-description',
  imports: [],
  templateUrl: './pizza-description.component.html',
  styleUrl: './pizza-description.component.css'
})
export class PizzaDescriptionComponent {

   @Input() name: string = '';
   @Input() description: string = '';
   @Input() price: string = '';
   @Input() waitTime: string = '';

}
