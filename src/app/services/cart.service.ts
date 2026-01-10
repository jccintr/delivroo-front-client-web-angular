import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {

  id: number;
  quantidade: number;
  total: number;
  obrigatorios: string;
  adicionais: string;
  observacao: string | null;
  produto: any;
  
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  constructor() {
    this.atualizarCarrinho();
  }

 
  private atualizarCarrinho(): void {
    this.cartSubject.next([...this.cartItems]);
  }

  adicionarProduto(item: any) : void {

    const novoItem: CartItem = {
      id: this.createUniqueId(),
      quantidade: item.quantidade,
      total: item.total,
      obrigatorios: item.obrigatorios,
      adicionais: item.adicionais,
      observacao: item.observacao,
      produto: item.produto
    };

    this.cartItems.push(novoItem);
    this.atualizarCarrinho();
    console.log('itens no carrinho=>',this.getQuantidadeItens());
    console.log('total do carrinho=>',this.getValorTotal());
  
  }

  /*
  adicionarItem(item: Omit<CartItem, 'id'>): void {
    const novoItem: CartItem = {
      ...item,
      id: this.createUniqueId()
    };
    this.cartItems.push(novoItem);
    this.atualizarCarrinho();
  }
*/
  // Remove um item pelo ID
  removerItem(id: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.atualizarCarrinho();
  }

  atualizarQuantidade(id: number, novaQuantidade: number): void {
    const item = this.cartItems.find(i => i.id === id);
    if (item && novaQuantidade > 0) {
      // Recalcula o total proporcionalmente
      const precoUnitario = item.total / item.quantidade;
      item.quantidade = novaQuantidade;
      item.total = precoUnitario * novaQuantidade;

      this.atualizarCarrinho();
    }
  }

  // Limpa todo o carrinho
  limparCarrinho(): void {
    this.cartItems = [];
    this.atualizarCarrinho();
  }

  // Retorna uma cópia dos itens atuais
  getItens(): CartItem[] {
    return [...this.cartItems];
  }

  // Quantidade total de produtos (somando as quantidades de cada item)
  getQuantidadeTotalItens(): number {
    return this.cartItems.reduce((total, item) => total + item.quantidade, 0);
  }

  // Valor total do carrinho
  getValorTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.total, 0);
  }

  // Número de itens diferentes no carrinho
  getQuantidadeItens(): number {
    return this.cartItems.length;
  }

  
  private createUniqueId(): number {
    return Date.now() + Math.floor(Math.random() * 10000);
  }

  // Formata os itens obrigatórios como string legível
  private formatarObrigatorios(obrigatorios: { nome: string; valor: string }[]): string {
    if (!obrigatorios || obrigatorios.length === 0) return '';
    return obrigatorios.map(o => `${o.nome}: ${o.valor}`).join(' | ');
  }

  // Formata os adicionais como string legível com preço
  private formatarAdicionais(adicionais: { nome: string; valor: number }[]): string {
    if (!adicionais || adicionais.length === 0) return '';
    return adicionais
      .map(a => `${a.nome} (+R$ ${a.valor.toFixed(2).replace('.', ',')})`)
      .join(' | ');
  }
}
