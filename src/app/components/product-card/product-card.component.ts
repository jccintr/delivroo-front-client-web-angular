import { Component, Input } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  constructor(public storeService: StoreService,private router: Router) {}

   @Input() product: any = {};

    viewProductDetails(product: any) {
     // console.log(product)
      this.router.navigate(['/product'], { state: { product } });
    }

}
