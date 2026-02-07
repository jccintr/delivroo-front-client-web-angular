import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface OrderData {
    tenant_id: number;
    nome: string;
    telefone: string;
    delivery: boolean;
    endereco?: string | null;         
    taxa_id?: number | null;   
    pagamento_id?: number | null;
    observacao?: string;       
    itensPedido: any[];  
}

export interface OrderResponse {
  user_id: number;
  token: string;
  nome: string;
  telefone: string;
  delivery: boolean;
  endereco?: string | null; 
  bairro: string | null; 
  taxa_entrega: string;
  forma_pagamento: string;
  observacao: string | null;
  id: number;
}

export interface PixData {
  chave: string;
  favorecido: string;
}

export interface StatusPedidoResponse {
  id: number;
  descricao: string;
  descricao_curta: string;
  cor: string;
}

export interface StatusPedidoLogResponse {
  id: number;
  pedido_id: number;
  status_pedido_id: number;
  motivo: string | null;
  data: string;
  status_pedido: StatusPedidoResponse;
}

export interface LastOrderResponse {
  id: number;
  token: string;
  user_id: number;
  delivery: boolean;
  nome: string;
  telefone: string;
  endereco: string | null;
  bairro: string | null;
  taxa_entrega: string;
  forma_pagamento: string;
  observacao: string | null;
  desconto: string;
  data: string;
  total: number;
  itens_pedido: any[];
  status_pedido: StatusPedidoResponse;
  status_pedido_log: StatusPedidoLogResponse[];
} 


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  //private readonly BASE_API: string = 'https://api.delivroo.app.br/api';
  //public readonly BASE_STORAGE: string = 'https://api.delivroo.app.br/storage';
  private readonly BASE_API: string = 'http://127.0.0.1:8000/api';
  public readonly BASE_STORAGE: string = 'http://127.0.0.1:8000/storage';
  private waitTime: string = '';
  private storeid: number = 0;
  private pixData: PixData = {chave: '', favorecido: ''};
  private slug: string = '';
  private isOpen: boolean = true;
  constructor(private http: HttpClient) {}

  getStoreData(store: string): Observable<any> {
    return this.http.get<any>(`${this.BASE_API}/tenant/${store}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).pipe(
      tap(data => {
        this.waitTime = data.tempo_espera;
        this.storeid = data.id;
        this.pixData = {chave: data.chave_pix,favorecido: data.favorecido_pix};
        this.slug = data.slug;
        this.isOpen = data.aberto
      })
    );
}



  getWaitTime(){
    return this.waitTime;
  }

  getStoreId(){
    return this.storeid;
  }
  getPixData(){
    return this.pixData;
  }

  getStoreSlug(){
    return this.slug;
  }

  getIsOpen(){
    return this.isOpen;
  }

createOrder(orderData: OrderData): Observable<any> {
    return this.http.post<any>(
      `${this.BASE_API}/pedidos`,
      orderData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
  }
  
  getLastOrder(): Observable<LastOrderResponse> {
    const lastOrderId = localStorage.getItem('lastOrderId');
    if (!lastOrderId) {
      throw new Error('No last order ID found in localStorage');
    }
    return this.http.get<LastOrderResponse>(`${this.BASE_API}/lastorder/${lastOrderId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }); 
  }
  
}