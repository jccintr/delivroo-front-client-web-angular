import { Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
   
   { path: '', component: HomeComponent },
  { path: ':store', component: StoreComponent },
  { path: '**', redirectTo: '' }
   
];
