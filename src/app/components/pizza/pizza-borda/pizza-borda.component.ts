import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { BordaPizza, PizzasService } from '../../../services/pizzas.service';

@Component({
  selector: 'app-pizza-borda',
  imports: [],
  templateUrl: './pizza-borda.component.html',
  styleUrl: './pizza-borda.component.css'
})
export class PizzaBordaComponent implements OnInit {

 @Input() tamanhoSelecionado: string = 'Broto';
 @Output() bordaSelecionadaChange = new EventEmitter<BordaPizza>();
 pizzasService = inject(PizzasService);
 bordas: BordaPizza[] = [];
 selectedBorda: BordaPizza | null = null;

 ngOnInit() {
    this.bordas = this.pizzasService.bordas().filter(b => b.ativo);  // Filtra apenas ativas, se aplicável

    // Seleciona a primeira borda como padrão
    if (this.bordas.length > 0) {
      this.selectedBorda = this.bordas[0];
      this.emitSelection();
    }
  }

  onBordaChange(borda: BordaPizza) {
    this.selectedBorda = borda;
    this.emitSelection();
  }

  getPrecoBorda(borda: BordaPizza): string {
    return this.tamanhoSelecionado === 'Grande' ? borda.grande : borda.broto;
  }

  private emitSelection() {
    if (this.selectedBorda) {
      this.bordaSelecionadaChange.emit(this.selectedBorda);
    }
  }
}
