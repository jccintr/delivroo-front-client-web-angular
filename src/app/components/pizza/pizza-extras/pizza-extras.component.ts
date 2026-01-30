import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AdicionalPizza, PizzasService } from '../../../services/pizzas.service';
import { ProductExtraItemComponent } from "../../product-detail/product-extra-item/product-extra-item.component";

@Component({
  selector: 'app-pizza-extras',
  imports: [ProductExtraItemComponent],
  templateUrl: './pizza-extras.component.html',
  styleUrl: './pizza-extras.component.css'
})
export class PizzaExtrasComponent implements OnInit {

  @Input() tamanhoSelecionado: string = 'Broto'; // 'Broto' | 'Grande'

  @Output() extrasSelecionadosChange = new EventEmitter<AdicionalPizza[]>();
  @Output() totalExtrasChange = new EventEmitter<number>();

  pizzasService = inject(PizzasService);

  adicionais: AdicionalPizza[] = [];
  extrasSelecionados: AdicionalPizza[] = [];
  totalExtras: number = 0;

  ngOnInit() {
    // Carrega apenas os adicionais ativos
    this.adicionais = this.pizzasService.adicionaisPizza().filter(a => a.ativo);

    // Se quiser pré-selecionar algum (opcional)
    // this.extrasSelecionados = [];
    this.atualizarTotal();
  }

  toggleExtra(adicional: AdicionalPizza) {
    const index = this.extrasSelecionados.findIndex(e => e.id === adicional.id);

    if (index === -1) {
      // Adicionar
      this.extrasSelecionados.push(adicional);
      console.log(`[PizzaExtras] Adicional INCLUÍDO: ${adicional.nome} (R$ ${this.getPreco(adicional)})`);
    } else {
      // Remover
      const removido = this.extrasSelecionados.splice(index, 1)[0];
      console.log(`[PizzaExtras] Adicional REMOVIDO: ${removido.nome}`);
    }

    this.atualizarTotal();
    this.emitirMudancas();
  }

  isSelected(adicional: AdicionalPizza): boolean {
    return this.extrasSelecionados.some(e => e.id === adicional.id);
  }

  getPreco(adicional: AdicionalPizza): string {
    const valor = this.tamanhoSelecionado === 'Grande' 
      ? Number(adicional.grande) 
      : Number(adicional.broto);

    return isNaN(valor) ? '0,00' : valor.toFixed(2).replace('.', ',');
  }

  getPrecoNumerico(adicional: AdicionalPizza): number {
    return this.tamanhoSelecionado === 'Grande' 
      ? Number(adicional.grande) 
      : Number(adicional.broto);
  }

  private atualizarTotal() {
    this.totalExtras = this.extrasSelecionados.reduce((sum, item) => {
      return sum + this.getPrecoNumerico(item);
    }, 0);
  }

  private emitirMudancas() {
    this.extrasSelecionadosChange.emit([...this.extrasSelecionados]);
    this.totalExtrasChange.emit(this.totalExtras);
  }

}
