import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-header',
  imports: [],
  templateUrl: './cart-header.component.html',
  styleUrl: './cart-header.component.css'
})
export class CartHeaderComponent {

constructor(private location: Location) {}

 back(){
    this.location.back();
  }

}
