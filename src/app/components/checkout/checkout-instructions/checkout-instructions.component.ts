import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-instructions',
  imports: [],
  templateUrl: './checkout-instructions.component.html',
  styleUrl: './checkout-instructions.component.css'
})
export class CheckoutInstructionsComponent {

   @Output() setInstructions = new EventEmitter<string>();
  
 
   onChangeInstructionsInput(event: Event){
        this.setInstructions.emit((event.target as HTMLInputElement).value);
    }


}
