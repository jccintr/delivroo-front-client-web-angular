import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { StoreService } from '../../../services/store.service';
import { ProductHeaderComponent } from "../../product-detail/product-header/product-header.component";
import { Location } from '@angular/common';
import { PizzaDescriptionComponent } from "../pizza-description/pizza-description.component";
import { PizzaTamanhoComponent } from "../pizza-tamanho/pizza-tamanho.component";
import { PizzaSaboresComponent } from "../pizza-sabores/pizza-sabores.component";
import { PizzaSaboresSeletorComponent } from "../pizza-sabores-seletor/pizza-sabores-seletor.component";
import { AdicionalPizza, BordaPizza, Pizza } from '../../../services/pizzas.service';
import { PizzaBordaComponent } from "../pizza-borda/pizza-borda.component";
import { PizzaExtrasComponent } from "../pizza-extras/pizza-extras.component";
import { PizzaInstructionsComponent } from "../pizza-instructions/pizza-instructions.component";
import { PizzaAddComponent } from "../pizza-add/pizza-add.component";
import { AlertDialogComponent } from "../../alert-dialog/alert-dialog.component";






@Component({
  selector: 'app-pizza-details',
  standalone: true,
  imports: [ProductHeaderComponent, PizzaDescriptionComponent, PizzaTamanhoComponent, PizzaSaboresComponent, PizzaSaboresSeletorComponent, PizzaBordaComponent, PizzaExtrasComponent, PizzaInstructionsComponent, PizzaAddComponent, AlertDialogComponent],
  templateUrl: './pizza-details.component.html',
  styleUrl: './pizza-details.component.css'
})
export class PizzaDetailsComponent implements OnInit{
  productData: any = {}; 
  waitTime: string = '';
  isOpen: boolean = false;
  productTotal: number = 0;
  quantity: number = 1;
  totalExtras: number = 0;
  tamanhos: string[] = ['Broto', 'Grande'];
  tamanhoSelecionado: string = 'Broto';
  quantidadeSabores: number = 1;
  saboresSelecionados: Pizza[] = [];
  bordaSelecionada: BordaPizza | null = null;
  extras: AdicionalPizza[] = [];
  requiredItems: { nome: string; valor: string }[] = [];
  instructions: string = '';
  showAlertDialog = false
  showValidationError = signal(false);
  validationErrorMessage = signal('');

  constructor(private router: Router,private storeService: StoreService, private cartService: CartService,private location: Location) {}
  
 ngOnInit(): void {
    const product = history.state.product;  
    if (product) {
      this.productData = product;
      this.productTotal = this.quantity * product.preco;
      this.waitTime = this.storeService.getWaitTime();
      this.isOpen = this.storeService.getIsOpen();
    }
  }

  onTamanhoSelecionado(tamanho: string) {
    this.tamanhoSelecionado = tamanho;
    this.updateTotal();
    // Aqui você pode atualizar preço total se o tamanho influenciar o valor
    // Exemplo: this.atualizarPrecoTotal();
    console.log('Tamanho selecionado:', tamanho);
  }

  onQuantidadeSaboresChange(quantidade: number) {
    this.quantidadeSabores = quantidade;
    console.log('Quantidade de sabores alterada para:', quantidade);
    
    // Aqui você pode:
    // - atualizar preço (se 2 sabores tiver acréscimo)
    // - resetar sabores selecionados anteriormente (se já tiver lógica de sabores)
    // - mostrar/esconder campos de escolha de sabores
    // Exemplo:
    // this.atualizarPrecoTotal();
}

setSaboresSelecionados(novosSabores: Pizza[]) {
    this.saboresSelecionados = novosSabores;
    this.updateTotal();
    console.log('Sabores selecionados atualizados no details:', this.saboresSelecionados);
    console.table(this.saboresSelecionados.map(s => ({
      id: s.id,
      nome: s.nome,
      grande: s.grande,
      broto: s.broto
    })));
  }

  setBordaSelecionada(borda: BordaPizza) { 
    this.bordaSelecionada = borda;
    console.log('Borda selecionada atualizada no details:', this.bordaSelecionada);
    console.table({
      id: borda.id,
      nome: borda.nome,
      preco: this.tamanhoSelecionado === 'Grande' ? borda.grande : borda.broto
    });
     this.updateTotal();
  }

  onAddToCart() {
    if(this.saboresSelecionados.length < this.quantidadeSabores) {
      this.validationErrorMessage.set('Por favor, selecione os sabores da pizza.');
      this.showAlertDialog = true;
      return;
    }
    console.log('Add to cart acionado no PizzaDetailsComponent');
    
    const itemCarrinho = {
      
      quantidade: this.quantity,
      total: this.productTotal,
      obrigatorios: this.formataObrigatorios(),  
      adicionais: this.formataExtras(),    
      observacao: this.instructions.trim(),
      produto: this.productData

    };
   console.log('Item adicionado ao carrinho:', itemCarrinho);
   
   this.cartService.adicionarProduto(itemCarrinho);
   this.location.back();
  
  }

 onQuantityChange(newQuantity: number) {

    this.quantity = newQuantity;
    this.updateTotal();
   
  }

private updateTotal() {
 
  const precoBase = this.calcularPrecoBase();
  const bordaPreco = this.bordaSelecionada
    ? Number(this.tamanhoSelecionado === 'Grande' 
        ? this.bordaSelecionada.grande 
        : this.bordaSelecionada.broto) || 0
    : 0;
  const extrasTotal = this.calcularTotalExtras();
  const precoUnitario = precoBase + bordaPreco + extrasTotal;
  this.productTotal = this.quantity * precoUnitario;
  this.totalExtras = extrasTotal;

}

  closeAlertDialog(){
     this.showAlertDialog = false;
  }

calcularPrecoBase(): number {
  if (!this.saboresSelecionados || this.saboresSelecionados.length === 0) {
    // Caso ainda não tenha selecionado sabores → usa o preço do produto principal
    return Number(this.productData.preco || 0);
  }

  // Determina qual campo de preço usar dependendo do tamanho
  const campoPreco = this.tamanhoSelecionado === 'Grande' ? 'grande' : 'broto';

  // Pega os preços de todos os sabores selecionados
  const precos = this.saboresSelecionados
    .map(sabor => Number(sabor[campoPreco] || 0))
    .filter(preco => !isNaN(preco)); // remove possíveis valores inválidos

  if (precos.length === 0) {
    return 0;
  }

  // Se for apenas 1 sabor → retorna o preço dele
  // Se forem 2 ou mais → retorna o MAIOR preço
  const precoBase = Math.max(...precos);

  return precoBase;
}

calcularTotalExtras(): number {
  if (!this.extras || this.extras.length === 0) {
    return 0;
  }

  // Define qual campo de preço usar dependendo do tamanho selecionado
  const campoPreco = this.tamanhoSelecionado === 'Grande' ? 'grande' : 'broto';

  // Converte todos os valores para número e soma
  const total = this.extras.reduce((soma, extra) => {
    const valor = Number(extra[campoPreco] || 0);
    return soma + (isNaN(valor) ? 0 : valor);
  }, 0);

  return total;
}

onExtrasChange(novosExtras: AdicionalPizza[]) {
  this.extras = novosExtras;
  this.updateTotal();
}

 
 private formataObrigatorios(): string {
  const partes: string[] = [];

  // 1. Tamanho (sempre presente)
  partes.push(`Tamanho : ${this.tamanhoSelecionado}`);

  // 2. Sabores
  if (this.saboresSelecionados.length === 0) {
    partes.push('Sem sabores selecionados');
  } else if (this.saboresSelecionados.length === 1) {
    partes.push(`Inteira : ${this.saboresSelecionados[0].nome}`);
  } else {
    const qtd = this.saboresSelecionados.length;
    this.saboresSelecionados.forEach(sabor => {
      partes.push(`1/${qtd} : ${sabor.nome}`);
    });
  }

  // 3. Borda
  if (this.bordaSelecionada) {
    partes.push(`Borda : ${this.bordaSelecionada.nome}`);
  } else {
    partes.push('Borda : Sem borda');
    // ↑ você pode alterar para '' (vazio) se não quiser mostrar quando não tem borda
  }

  return partes.join('; ');
}

private formataExtras(): string {
  if (this.extras.length === 0) {
    return '';
  }

  const campoPreco = this.tamanhoSelecionado === 'Grande' ? 'grande' : 'broto';

  const itensFormatados = this.extras.map(extra => {
    const valor = Number(extra[campoPreco] || 0);
    const valorStr = valor > 0 ? valor.toFixed(2).replace('.', ',') : '0,00';
    return `${extra.nome} : ${valorStr}`;
  });

  return itensFormatados.join(';');
}
 

}
