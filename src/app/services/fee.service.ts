import { Injectable, signal } from '@angular/core';


export interface Fee {
  id: number;
  user_id: number;
  bairro: string;
  valor:number;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  
  // Signal writable (só o serviço escreve)
  private feesSignal = signal<Fee[]>([]);

  // O que os componentes vão consumir (somente leitura)
  readonly fees = this.feesSignal.asReadonly();

  // Método para atualizar (chamado apenas pelo componente que carrega os dados)
  setFees(fees: Fee[]) {
    this.feesSignal.set(fees);
  }

}
