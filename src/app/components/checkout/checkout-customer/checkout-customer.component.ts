import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-checkout-customer',
  imports: [NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './checkout-customer.component.html',
  styleUrl: './checkout-customer.component.css'
})
export class CheckoutCustomerComponent {

    @Output() setName = new EventEmitter<string>();
    @Output() setPhone = new EventEmitter<string>();


    onChangeNameInput(event: Event){
        this.setName.emit((event.target as HTMLInputElement).value);
    }

    onChangePhoneInput(event: Event){
      this.setPhone.emit((event.target as HTMLInputElement).value);
    }

}
