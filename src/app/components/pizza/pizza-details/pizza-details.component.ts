import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { StoreService } from '../../../services/store.service';
import { ProductHeaderComponent } from "../../product-detail/product-header/product-header.component";
import { Location } from '@angular/common';
import { PizzaDescriptionComponent } from "../pizza-description/pizza-description.component";
import { PizzaTamanhoComponent } from "../pizza-tamanho/pizza-tamanho.component";
import { PizzaSaboresComponent } from "../pizza-sabores/pizza-sabores.component";
import { PizzaSaboresSeletorComponent } from "../pizza-sabores-seletor/pizza-sabores-seletor.component";
import { BordaPizza, Pizza } from '../../../services/pizzas.service';
import { PizzaBordaComponent } from "../pizza-borda/pizza-borda.component";

export interface AdicionalPizza {
  id: number;
  user_id: number;
  nome: string;
  broto: string;
  grande: string;
  ativo: boolean
}





@Component({
  selector: 'app-pizza-details',
  standalone: true,
  imports: [ProductHeaderComponent, PizzaDescriptionComponent, PizzaTamanhoComponent, PizzaSaboresComponent, PizzaSaboresSeletorComponent, PizzaBordaComponent],
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
  extras: { nome: string; valor: number }[] = [];
  requiredItems: { nome: string; valor: string }[] = [];
  instructions: string = '';

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
    console.log('Sabores selecionados atualizados no details:', this.saboresSelecionados);
    console.table(this.saboresSelecionados.map(s => ({
      id: s.id,
      nome: s.nome,
      // adicione outros campos que quiser ver
    })));
  }

  setBordaSelecionada(borda: BordaPizza) {  // ← Novo método para log e atualização
    this.bordaSelecionada = borda;
    console.log('Borda selecionada atualizada no details:', this.bordaSelecionada);
    console.table({
      id: borda.id,
      nome: borda.nome,
      preco: this.tamanhoSelecionado === 'Grande' ? borda.grande : borda.broto
    });
  }

}
