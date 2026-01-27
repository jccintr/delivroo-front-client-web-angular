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
    
    constructor(private storeService: StoreService,private router: Router) {
       this.slug = this.storeService.getStoreSlug();
    }
    
    async ngOnInit(): Promise<void> {
  
        try {
          this.lastOrder = await firstValueFrom(this.storeService.getLastOrder());  
        } catch (error) {
            console.error('Erro ao carregar o último pedido:', error);
        }
  
    }

     returnToHome(): void {
      console.log('Retornando à página inicial...',this.slug);
      this.router.navigate([`/${this.slug}`]);
     }

     refreshLastOrder(): void {
      console.log('Atualizando o pedido...');
      this.ngOnInit();
     }

}
