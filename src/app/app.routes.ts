import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';

export const routes: Routes = [
    {path: '', component: AppComponent},
    {path: ':store', component: StoreComponent},
    { path: '**', redirectTo: '' }
];
