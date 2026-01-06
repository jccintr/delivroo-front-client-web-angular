import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-required-item',
  imports: [],
  templateUrl: './product-required-item.component.html',
  styleUrl: './product-required-item.component.css'
})
export class ProductRequiredItemComponent implements OnInit {
  
 @Input() item: any = {};

 @Output() opcaoSelecionada = new EventEmitter<{ nome: string; valor: string }>();

 selectedOption: string = ''

 ngOnInit() {
    // Define a primeira opção como padrão
    if (this.item.opcoes && this.item.opcoes.length > 0) {
      this.selectedOption = this.item.opcoes[0];
      this.emitSelection();
    }
  }

 onOptionChange(opcao: string) {
    this.selectedOption = opcao;
    this.emitSelection();
  }

  private emitSelection() {
    this.opcaoSelecionada.emit({
      nome: this.item.nome,
      valor: this.selectedOption
    });
  }
 
}
