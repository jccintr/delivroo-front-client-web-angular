import { Injectable, signal } from '@angular/core';

export interface Payment {
  id: number;
  user_id: number;
  nome: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // Signal writable (só o serviço escreve)
  private paymentsSignal = signal<Payment[]>([]);

  // O que os componentes vão consumir (somente leitura)
  readonly payments = this.paymentsSignal.asReadonly();

  // Método para atualizar (chamado apenas pelo componente que carrega os dados)
  setPayments(payments: Payment[]) {
    this.paymentsSignal.set(payments);
  }

  // Opcional: método para limpar (logout, trocar loja, etc)
  clearPayments() {
    this.paymentsSignal.set([]);
  }
}
