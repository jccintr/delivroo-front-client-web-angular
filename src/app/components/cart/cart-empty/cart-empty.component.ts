import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart-empty',
  imports: [],
  templateUrl: './cart-empty.component.html',
  styleUrl: './cart-empty.component.css'
})
export class CartEmptyComponent {

  constructor(private location: Location) {}

   back(){
    this.location.back();
  }

}
