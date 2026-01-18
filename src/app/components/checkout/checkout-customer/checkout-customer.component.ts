import { Component, EventEmitter, Input, OnChanges, Output, signal, Signal } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-checkout-customer',
  imports: [NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './checkout-customer.component.html',
  styleUrl: './checkout-customer.component.css'
})
export class CheckoutCustomerComponent implements OnChanges {

    @Input() name = '';     // vem de checkout.component.ts
    @Input() phone = '';    // vem de checkout.component.ts

    @Output() setName = new EventEmitter<string>();
    @Output() setPhone = new EventEmitter<string>();

    nameInputValue = signal(this.name);
    phoneInputValue = signal(this.phone);

    ngOnChanges() {
    this.nameInputValue.set(this.name);
    this.phoneInputValue.set(this.phone);
  }


    onChangeNameInput(event: Event){
      const value = (event.target as HTMLInputElement).value;
      this.setName.emit(value);
      this.nameInputValue.set(value);   // mantém sincronizado
   }

   onChangePhoneInput(event: Event){
      const value = (event.target as HTMLInputElement).value;
      this.setPhone.emit(value);
      this.phoneInputValue.set(value);
  }
}
