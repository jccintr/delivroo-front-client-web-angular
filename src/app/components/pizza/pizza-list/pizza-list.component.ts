import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Pizza, PizzasService } from '../../../services/pizzas.service';
import { PizzaCardComponent } from "../pizza-card/pizza-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [PizzaCardComponent,CommonModule],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.css'
})
export class PizzaListComponent {

  @Input() maxSelecionaveis: number = 1;
  @Input() selecionados: Pizza[] = [];
  @Input() tamanhoSelecionado: string = 'Broto';
  @Output() saborToggle = new EventEmitter<Pizza>();

  pizzasService = inject(PizzasService);
  search = '';

  get pizzasFiltradas(): Pizza[] {
    if (!this.search.trim()) return this.pizzasService.pizzas();
    const termo = this.search.toLowerCase();
    return this.pizzasService.pizzas().filter(p => 
      p.nome.toLowerCase().includes(termo) || 
      (p.descricao || '').toLowerCase().includes(termo)
    );
  }

  estaSelecionado(pizza: Pizza): boolean {
    return this.selecionados.some(s => s.id === pizza.id);
  }

  onToggle(pizza: Pizza) {
    this.saborToggle.emit(pizza);
  }

  atualizarBusca(event: Event) {
  const input = event.target as HTMLInputElement;
  this.search = input.value;
}

}
