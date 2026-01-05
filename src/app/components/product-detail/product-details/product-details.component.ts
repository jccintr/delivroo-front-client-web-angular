import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductHeaderComponent } from "../product-header/product-header.component";
import { ProductDescriptionComponent } from "../product-description/product-description.component";
import { StoreService } from '../../../services/store.service';
import { ProductRequiredItemComponent } from "../product-required-item/product-required-item.component";
import { ProductExtrasComponent } from "../product-extras/product-extras.component";
import { ProductInstructionsComponent } from "../product-instructions/product-instructions.component";
import { ProductAddComponent } from "../product-add/product-add.component";

@Component({
  selector: 'app-product-details',
  imports: [ProductHeaderComponent, ProductDescriptionComponent, ProductRequiredItemComponent, ProductExtrasComponent, ProductInstructionsComponent, ProductAddComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  productData: any = {}; 
  waitTime: string = '';
  productTotal: number = 0;
  quantity: number = 1;
  constructor(private router: Router,private storeService: StoreService) {}
  
  ngOnInit(): void {
    const product = history.state.product;  
    if (product) {
      this.productData = product;
      this.productTotal = this.quantity * product.preco;
      this.waitTime = this.storeService.getWaitTime();
    }
  }

  onQuantityChange(newQuantity: number) {
    this.quantity = newQuantity;
    this.productTotal = this.quantity * this.productData.preco;
  }



}
