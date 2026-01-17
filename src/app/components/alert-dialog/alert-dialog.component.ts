import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  imports: [CommonModule],
  templateUrl: './alert-dialog.component.html',
  styleUrl: './alert-dialog.component.css'
})
export class AlertDialogComponent {

  @Input() message: string = 'Operação realizada com sucesso.'; // mensagem padrão

  @Output() closed = new EventEmitter<void>();

  fechar() {
    this.closed.emit();
  }

}
