import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-checkout-header',
  imports: [],
  templateUrl: './checkout-header.component.html',
  styleUrl: './checkout-header.component.css'
})
export class CheckoutHeaderComponent {

  constructor(private location: Location) {}

  back(){
    this.location.back();
  }

}
