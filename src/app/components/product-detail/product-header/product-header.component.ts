import { Component, Input } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-product-header',
  imports: [CommonModule],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css'
})
export class ProductHeaderComponent {

  constructor(public storeService: StoreService,private router: Router,private location: Location) {}

  @Input() image: string | null = null;

  back(){
    this.location.back();
  }

}
