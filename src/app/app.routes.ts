import { Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './components/home/home.component';
import { StoreNotFoundComponent } from './components/store-not-found/store-not-found.component';
import { ProductDetailsComponent } from './components/product-detail/product-details/product-details.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout/checkout.component';
import { CheckoutSuccessComponent } from './components/checkout/checkout-success/checkout-success.component';
import { CheckoutFailureComponent } from './components/checkout/checkout-failure/checkout-failure.component';
import { TrackOrderComponent } from './components/trackOrder/track-order/track-order.component';

export const routes: Routes = [
   
  { path: '', component: HomeComponent },
  { path: 'storeNotFound', component: StoreNotFoundComponent },
  { path: 'product', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'success', component: CheckoutSuccessComponent },
  { path: 'failure', component: CheckoutFailureComponent },
   { path: 'track', component: TrackOrderComponent },
  { path: ':store', component: StoreComponent },
  { path: '**', redirectTo: '' }
   
];
