import { Injectable, signal } from '@angular/core';

export interface Pizza {
  id: number;
  user_id: number;
  nome: string;
  descricao: string;
  imagem: string | null;
  grande: string;
  broto: string;
  ativo: boolean;
}

export interface BordaPizza {
  id: number;
  user_id: number;
  nome: string;
  grande: string;
  broto: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PizzasService {
   private pizzasSignal = signal<Pizza[]>([]);
   private bordasSignal = signal<BordaPizza[]>([]);

  // O que os componentes vão consumir (somente leitura)
  readonly pizzas = this.pizzasSignal.asReadonly();
  readonly bordas = this.bordasSignal.asReadonly();

  // Método para atualizar (chamado apenas pelo componente que carrega os dados)
  setPizzas(pizzas: Pizza[]) {
    this.pizzasSignal.set(pizzas);
  }

  setBordas(bordas: BordaPizza[]) {
    this.bordasSignal.set(bordas);
  }
}
