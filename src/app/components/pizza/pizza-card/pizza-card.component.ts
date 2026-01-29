import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pizza } from '../../../services/pizzas.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-card.component.html',
  styleUrl: './pizza-card.component.css'
})
export class PizzaCardComponent {
  @Input() pizza!: Pizza;
  @Input() selecionado = false;
  @Input() disabled = false;
  @Input() tamanhoSelecionado: string = 'Broto';
  @Output() selecionar = new EventEmitter<Pizza>();

  get precoExibido(): string {
    if (!this.pizza) return '—';
    
    const preco = this.tamanhoSelecionado === 'Grande' 
      ? this.pizza.grande 
      : this.pizza.broto;
    
    return preco || '—';  // fallback if empty
  }

  onSelect() {
    if (!this.disabled) {
      this.selecionar.emit(this.pizza);   // ← emite o objeto pizza
    }
  }
}
