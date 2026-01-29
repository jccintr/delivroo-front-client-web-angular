import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pizza-tamanho',
  imports: [],
  templateUrl: './pizza-tamanho.component.html',
  styleUrl: './pizza-tamanho.component.css'
})
export class PizzaTamanhoComponent implements OnInit {

  @Input() tamanhos: string[] = ['Broto', 'Grande'];

  @Output() tamanhoSelecionado = new EventEmitter<string>();

  selectedTamanho: string = '';

  ngOnInit() {
    // Seleciona o primeiro tamanho como padrão (geralmente o mais comum)
    if (this.tamanhos && this.tamanhos.length > 0) {
      this.selectedTamanho = this.tamanhos[0];
      this.emitSelection();
    }
  }

  onTamanhoChange(tamanho: string) {
    this.selectedTamanho = tamanho;
    this.emitSelection();
  }

  private emitSelection() {
    this.tamanhoSelecionado.emit(this.selectedTamanho);
  }

}