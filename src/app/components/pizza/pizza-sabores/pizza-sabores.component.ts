import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pizza-sabores',
  imports: [],
  templateUrl: './pizza-sabores.component.html',
  styleUrl: './pizza-sabores.component.css'
})
export class PizzaSaboresComponent implements OnInit {

  @Input() quantidadeSaboresInicial: number = 1;

  @Output() quantidadeSaboresChange = new EventEmitter<number>();

  opcoes: string[] = ['1 Sabor', '2 Sabores'];
  selectedOpcao: string = '';

  ngOnInit() {
    // Define o valor inicial vindo do pai (ou padrão = 1 sabor)
    const valorInicial = this.quantidadeSaboresInicial;
    this.selectedOpcao = valorInicial === 2 ? '2 Sabores' : '1 Sabor';
    this.emitirMudanca();
  }

  onOpcaoChange(opcao: string) {
    this.selectedOpcao = opcao;
    this.emitirMudanca();
  }

  private emitirMudanca() {
    const quantidade = this.selectedOpcao === '2 Sabores' ? 2 : 1;
    this.quantidadeSaboresChange.emit(quantidade);
  }

}
