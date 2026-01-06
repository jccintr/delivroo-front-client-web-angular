import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductExtraItemComponent } from "../product-extra-item/product-extra-item.component";

interface ExtraSelecionado {
  nome: string;
  valor: number;
}

@Component({
  selector: 'app-product-extras',
  imports: [ProductExtraItemComponent],
  templateUrl: './product-extras.component.html',
  styleUrl: './product-extras.component.css'
})
export class ProductExtrasComponent {

@Input() extras: any[] = [];

@Output() totalExtrasChange = new EventEmitter<number>();
@Output() selectedExtrasChange = new EventEmitter<ExtraSelecionado[]>();

private selectedExtrasTotal: number = 0;
private selectedExtras: ExtraSelecionado[] = [];

/*
   onExtraToggled(change: { 
    valor: number; 
    selected: boolean;
    id: string | number;
    nome: string;
  }) {
    const extraId = String(change.id);
    
    if (change.selected) {
      this.selectedExtrasTotal += change.valor;
      if (!this.selectedExtrasIds.includes(extraId)) {
        this.selectedExtrasIds.push(extraId);
      }
    } else {
      this.selectedExtrasTotal -= change.valor;
      const index = this.selectedExtrasIds.indexOf(extraId);
      if (index > -1) {
        this.selectedExtrasIds.splice(index, 1);
      }
    }

    if (this.selectedExtrasTotal < 0) this.selectedExtrasTotal = 0;

    // Emite o total
    this.totalExtrasChange.emit(this.selectedExtrasTotal);
    // Emite a lista de extras selecionados
    this.selectedExtrasChange.emit([...this.selectedExtrasIds]);
  }
*/
  onExtraToggled(change: { extra: { nome: string; valor: number }; selected: boolean }) {
    const { extra, selected } = change;

    if (selected) {
      // Adiciona se ainda não existe
      if (!this.selectedExtras.some(e => e.nome === extra.nome)) {
        this.selectedExtras.push(extra);
        this.selectedExtrasTotal += extra.valor;
      }
    } else {
      // Remove se desmarcado
      const index = this.selectedExtras.findIndex(e => e.nome === extra.nome);
      if (index !== -1) {
        this.selectedExtrasTotal -= this.selectedExtras[index].valor;
        this.selectedExtras.splice(index, 1);
      }
    }

    // Garante que não fique negativo (por segurança)
    if (this.selectedExtrasTotal < 0) this.selectedExtrasTotal = 0;

    this.totalExtrasChange.emit(this.selectedExtrasTotal);
    this.selectedExtrasChange.emit([...this.selectedExtras]); // Emite cópia do array
  }
}
