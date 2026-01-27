import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-track-order-delivery',
  imports: [],
  templateUrl: './track-order-delivery.component.html',
  styleUrl: './track-order-delivery.component.css'
})
export class TrackOrderDeliveryComponent {

   @Input() delivery: boolean = false;
   @Input() addressDelivery: string = '';

}
