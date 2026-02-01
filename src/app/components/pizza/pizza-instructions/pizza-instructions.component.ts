import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pizza-instructions',
  imports: [],
  templateUrl: './pizza-instructions.component.html',
  styleUrl: './pizza-instructions.component.css'
})
export class PizzaInstructionsComponent {

  @Output() instructionsChange = new EventEmitter<string>();

  onTextareaChange(event: Event) {

    const textarea = event.target as HTMLTextAreaElement;
    this.instructionsChange.emit(textarea.value);
    
  }

}
