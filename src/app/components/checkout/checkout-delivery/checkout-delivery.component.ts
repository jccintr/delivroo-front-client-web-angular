import { Component, EventEmitter, input, Input, output, Output, signal } from '@angular/core';
import { Fee } from '../../../services/fee.service';

@Component({
  selector: 'app-checkout-delivery',
  imports: [],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css'
})
export class CheckoutDeliveryComponent {

   @Input() delivery!: boolean;
   fees = input<Fee[]>([]);
   @Output() setAddres = new EventEmitter<string>();
   @Output() setDelivery = new EventEmitter<boolean>();

   feeSelected = output<Fee>();
   public _selected = signal<Fee | null>(null);
 
   onChangeAddressInput(event: Event){
        this.setAddres.emit((event.target as HTMLInputElement).value);
    }

   selectDeliveryType(isDelivery: boolean) {
    
    this.setDelivery.emit(isDelivery);   
   }

    onFeeChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  const selectedId = Number(select.value);
  const fee = this.fees().find(f => f.id === selectedId);

  if (fee) {
    this._selected.set(fee);
    this.feeSelected.emit(fee);          // ← aqui está emitindo Fee
  }
}

  private emitSelection() {
    const selected = this._selected();
    if (selected) {
      this.feeSelected.emit(selected);
    }
  }

   


}
