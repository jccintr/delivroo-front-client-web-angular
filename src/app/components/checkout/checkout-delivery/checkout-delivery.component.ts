import { Component, EventEmitter, input, Input, OnChanges, OnInit, output, Output, signal, SimpleChanges } from '@angular/core';
import { Fee } from '../../../services/fee.service';

@Component({
  selector: 'app-checkout-delivery',
  imports: [],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css'
})
export class CheckoutDeliveryComponent implements OnInit, OnChanges {

  ngOnChanges(): void {
    this.addressInputValue.set(this.address);
  }

  ngOnInit() {
    this.emitInitialFeeIfPossible();
  }

   @Input() address = '';
   @Input() delivery!: boolean;
   fees = input<Fee[]>([]);
   @Output() setAddres = new EventEmitter<string>();
   @Output() setDelivery = new EventEmitter<boolean>();

   addressInputValue = signal(this.address);

   feeSelected = output<Fee>();
   public _selected = signal<Fee | null>(null);
 
  
    onChangeAddressInput(event: Event){
      const value = (event.target as HTMLInputElement).value;
      this.setAddres.emit(value);
      this.addressInputValue.set(value);   // mantém sincronizado
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

  private emitInitialFeeIfPossible() {
    // Só executa se houver itens e ainda não houver seleção
    if (this.fees().length > 0 && !this._selected()) {
      const firstFee = this.fees()[0];
      this._selected.set(firstFee);
      this.feeSelected.emit(firstFee);
      // Opcional: console.log('Fee inicial selecionado automaticamente:', firstFee);
    }
  }

   


}
