import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-delivery',
  imports: [],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css'
})
export class CheckoutDeliveryComponent {

   @Input() delivery!: boolean;
   @Output() setAddres = new EventEmitter<string>();
   @Output() setDelivery = new EventEmitter<boolean>();
 
   onChangeAddressInput(event: Event){
        this.setAddres.emit((event.target as HTMLInputElement).value);
    }

   selectDeliveryType(isDelivery: boolean) {
    this.setDelivery.emit(isDelivery);   
   }

     

   


}
