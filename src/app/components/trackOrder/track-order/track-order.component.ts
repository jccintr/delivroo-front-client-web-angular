import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LastOrderResponse, StoreService } from '../../../services/store.service';
import { TrackOrderTimelineComponent } from "../track-order-timeline/track-order-timeline.component";
import { TrackOrderPaymentComponent } from "../track-order-payment/track-order-payment.component";
import { TrackOrderDeliveryComponent } from "../track-order-delivery/track-order-delivery.component";
import { TrackOrderSummaryComponent } from "../track-order-summary/track-order-summary.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-order',
  imports: [TrackOrderTimelineComponent, TrackOrderPaymentComponent, TrackOrderDeliveryComponent, TrackOrderSummaryComponent],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.css'
})
export class TrackOrderComponent implements OnInit {

   lastOrder: LastOrderResponse | null = null;
   slug: string;
   isLoading = true;          
   hasError = false;
    
    constructor(private storeService: StoreService,private router: Router) {
       this.slug = this.storeService.getStoreSlug();
    }
    
    async ngOnInit(): Promise<void> {
       await this.loadOrder();
    }

     returnToHome(): void {
      console.log('Retornando à página inicial...',this.slug);
      this.router.navigate([`/${this.slug}`]);
     }

    async refreshLastOrder(): Promise<void> {
      console.log('Atualizando o pedido...');
      await this.loadOrder();   // mesma função usada no init e no refresh
   }

  private async loadOrder(): Promise<void> {
    try {
      this.isLoading = true;
      this.hasError = false;

      this.lastOrder = await firstValueFrom(this.storeService.getLastOrder());
      console.log('Último pedido carregado:', this.lastOrder);
    } catch (error) {
      console.error('Erro ao carregar o último pedido:', error);
      this.hasError = true;
    } finally {
      this.isLoading = false;
    }
  }

}
