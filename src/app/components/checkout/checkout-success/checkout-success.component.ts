import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-checkout-success',
  imports: [],    
  templateUrl: './checkout-success.component.html',
  styleUrl: './checkout-success.component.css'
})
export class CheckoutSuccessComponent  {
  pix = false;
  chavePix = '123e4567-e89b-12d3-a456-426614174000'; // Exemplo de chave Pix
  favorecidoPix = 'Delivroo Serviços de Entrega LTDA'; // Exemplo de favorecido Pix
  slug = '';

  constructor(private storeService: StoreService,private router: Router) {
    this.pix = history.state.pix;
    const pixData = this.storeService.getPixData();
    this.chavePix = pixData.chave || '';
    this.favorecidoPix = pixData.favorecido || '';
    this.slug = this.storeService.getStoreSlug();
  }

  showLastOrder(): void {
    this.router.navigate(['/track']);
  }

  returnToHome(): void {
    console.log('Retornando à página inicial...',this.slug);
    this.router.navigate([`/${this.slug}`]);
  }
}
