import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-track-order-summary',
  imports: [],
  templateUrl: './track-order-summary.component.html',
  styleUrl: './track-order-summary.component.css'
})
export class TrackOrderSummaryComponent {

   @Input() itensPedido: any[]  = [];
   @Input() total: number = 0;
   @Input() taxaEntrega: string = '';
   @Input() delivery: boolean = false;

   totalOrder(): number {
     return this.total + (this.delivery ? parseFloat(this.taxaEntrega) : 0);
   }
}
