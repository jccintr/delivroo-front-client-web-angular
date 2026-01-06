import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-extra-item',
  imports: [],
  templateUrl: './product-extra-item.component.html',
  styleUrl: './product-extra-item.component.css'
})
export class ProductExtraItemComponent {

  @Input() extra: any = {};
  @Output() extraToggled = new EventEmitter<{ extra: { nome: string; valor: number }; selected: boolean }>();
  isSelected: boolean = false;

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    this.isSelected = checkbox.checked;
    
    this.extraToggled.emit({
      extra: {
        nome: this.extra.nome,
        valor: Number(this.extra.valor)
      },
      selected: this.isSelected
    });
  }
 
}
