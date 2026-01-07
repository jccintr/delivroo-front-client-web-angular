import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductHeaderComponent } from "../product-header/product-header.component";
import { ProductDescriptionComponent } from "../product-description/product-description.component";
import { StoreService } from '../../../services/store.service';
import { ProductRequiredItemComponent } from "../product-required-item/product-required-item.component";
import { ProductExtrasComponent } from "../product-extras/product-extras.component";
import { ProductInstructionsComponent } from "../product-instructions/product-instructions.component";
import { ProductAddComponent } from "../product-add/product-add.component";
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [ProductHeaderComponent, ProductDescriptionComponent, ProductRequiredItemComponent, ProductExtrasComponent, ProductInstructionsComponent, ProductAddComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productData: any = {}; 
  waitTime: string = '';
  productTotal: number = 0;
  quantity: number = 1;
  totalExtras: number = 0;
  extras: { nome: string; valor: number }[] = [];
  requiredItems: { nome: string; valor: string }[] = [];
  instructions: string = '';

  constructor(private router: Router,private storeService: StoreService, private cartService: CartService) {}
  
  ngOnInit(): void {
    const product = history.state.product;  
    if (product) {
      this.productData = product;
      this.productTotal = this.quantity * product.preco;
      this.waitTime = this.storeService.getWaitTime();
    }
  }

  onQuantityChange(newQuantity: number) {

    this.quantity = newQuantity;
    this.updateTotal();
   
  }

  onTotalExtrasChange(newTotalExtras: number) {
    
    this.totalExtras = newTotalExtras;
    this.updateTotal();
    
  }

   onSelectedExtrasChange(selectedExtras: { nome: string; valor: number }[]) {
    this.extras = selectedExtras;
    console.log('Extras selecionados:', this.extras);
    // Exemplo de saída: [ { nome: 'Ovo', valor: 2 }, { nome: 'Queijo', valor: 3 } ]
  }

  onRequiredOptionSelected(selecao: { nome: string; valor: string }) {
    // Remove seleção anterior do mesmo grupo (se existir)
    this.requiredItems = this.requiredItems.filter(item => item.nome !== selecao.nome);
    
    // Adiciona a nova seleção
    this.requiredItems.push(selecao);

    console.log('Itens obrigatórios selecionados:', this.requiredItems);
  }

  onAddToCart() {
    // Monta o item completo para o carrinho
    const itemCarrinho = {
      
      quantidade: this.quantity,
      total: this.productTotal,
      obrigatorios: this.formataObrigatorios(this.requiredItems),  
      extras: this.formataExtras(this.extras),    
      observacoes: this.instructions.trim() || null,
      produto: this.productData

    };
   console.log('Item adicionado ao carrinho:', itemCarrinho);
   this.cartService.adicionarProduto(itemCarrinho);
  

    // Opcional: feedback ao usuário (toast, navegação, etc.)
   

    // Exemplo: navegar de volta ou para o carrinho
    // this.router.navigate(['/carrinho']);

    // Ou mostrar uma mensagem de sucesso
    alert('Adicionado ao carrinho com sucesso!');
  }

  private formataObrigatorios(requiredItems: { nome: string; valor: string }[]): string {
      if (!requiredItems || requiredItems.length === 0) {
        return '';
      }
      return requiredItems
        .map(item => `${item.nome} : ${item.valor}`)
        .join(';');
  }

  private formataExtras(extras: { nome: string; valor: number }[]): string {
      if (!extras || extras.length === 0) {
        return '';
      }
      return extras
        .map(item => `${item.nome} : ${item.valor.toFixed(2)}`)
        .join(';');
  }

  private updateTotal() {

    const precoBase = Number(this.productData.preco);
    this.productTotal = this.quantity * (precoBase + this.totalExtras);
   
  }



}
