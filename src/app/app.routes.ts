import { Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './components/home/home.component';
import { StoreNotFoundComponent } from './components/store-not-found/store-not-found.component';

export const routes: Routes = [
   
   { path: '', component: HomeComponent },
 
  { path: 'storeNotFound', component: StoreNotFoundComponent },
   { path: ':store', component: StoreComponent },
  { path: '**', redirectTo: '' }
   
];
