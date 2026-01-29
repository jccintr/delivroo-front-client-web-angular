import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Pizza, PizzasService } from '../../../services/pizzas.service';
import { PizzaListComponent } from "../pizza-list/pizza-list.component";

@Component({
  selector: 'app-pizza-sabores-seletor',
  standalone: true,
  imports: [PizzaListComponent],
  templateUrl: './pizza-sabores-seletor.component.html',
  styleUrl: './pizza-sabores-seletor.component.css'
})
export class PizzaSaboresSeletorComponent {

  @Input() maxSabores: number = 1;                    // vem de quantidadeSabores
  @Input() saboresSelecionados: Pizza[] = [];         // two-way binding ou apenas input
  @Input() tamanhoSelecionado: string = 'Broto';
  @Output() saboresChange = new EventEmitter<Pizza[]>();

  private pizzasService = inject(PizzasService);

  showModal = false;

  get saboresAtuais(): Pizza[] {
    return this.saboresSelecionados;
  }

  abrirModal() {
    this.showModal = true;
  }

  fecharModal() {
    this.showModal = false;
  }

  toggleSabor(pizza: Pizza) {
    const index = this.saboresSelecionados.findIndex(s => s.id === pizza.id);

    if (index !== -1) {
      // remover
      const novoArray = [...this.saboresSelecionados];
      novoArray.splice(index, 1);
      this.saboresChange.emit(novoArray);
    } else {
      // adicionar (se ainda cabe)
      if (this.saboresSelecionados.length < this.maxSabores) {
        this.saboresChange.emit([...this.saboresSelecionados, pizza]);
      }
    }
  }

  removerSabor(pizza: Pizza) {
    const novoArray = this.saboresSelecionados.filter(s => s.id !== pizza.id);
    this.saboresChange.emit(novoArray);
  }

}
