import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-instructions',
  imports: [],
  templateUrl: './product-instructions.component.html',
  styleUrl: './product-instructions.component.css'
})
export class ProductInstructionsComponent {

  @Output() instructionsChange = new EventEmitter<string>();

  onTextareaChange(event: Event) {

    const textarea = event.target as HTMLTextAreaElement;
    this.instructionsChange.emit(textarea.value);
    
  }

}
