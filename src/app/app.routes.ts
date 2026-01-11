import { Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './components/home/home.component';
import { StoreNotFoundComponent } from './components/store-not-found/store-not-found.component';
import { ProductDetailsComponent } from './components/product-detail/product-details/product-details.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout/checkout.component';

export const routes: Routes = [
   
  { path: '', component: HomeComponent },
  { path: 'storeNotFound', component: StoreNotFoundComponent },
  { path: 'product', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: ':store', component: StoreComponent },
  { path: '**', redirectTo: '' }
   
];
