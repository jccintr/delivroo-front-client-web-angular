import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from "../components/header/header.component";
import { Category, CategorySelectorComponent } from "../components/category-selector/category-selector.component";
import { SearchComponent } from "../components/search/search.component";
import { ProductListComponent } from "../components/product-list/product-list.component";

@Component({
  selector: 'app-store',
  imports: [HeaderComponent, CategorySelectorComponent, SearchComponent, ProductListComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit, OnDestroy {
  storeName: string = '';
  store: any = {};
  storeData: any = {};
  categories: any[] = [];
  products: any[] = [];
  selectedCategoryId: number = 1;
   private subscription: Subscription = new Subscription();
  
  constructor(private route: ActivatedRoute, private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeName = this.route.snapshot.paramMap.get('store')!;
    /*
    //  loja não existe
    if (!nomeLoja ) {
      this.router.navigate(['/404']); 
      // ou: this.router.navigate(['/notfound']);
      return;
    }
    */
   this.subscription = this.storeService.getStoreData(this.storeName).subscribe({
      next: (response) => {
        this.store = response;
        this.storeData = {
          name: this.store.name,
          address: this.store.logradouro,
          phone: this.store.telefone,
          logo: this.storeService.BASE_STORAGE + '/' +  this.store.logotipo,
          isOpen: this.store.aberto
        }
        this.categories = response.categorias;
        if (this.categories.length > 0) {
            this.selectedCategoryId = this.categories[0].id;
         }
         this.products = response.produtos;
      },
      error: (error) => {
        console.error('Erro ao carregar dados da loja:', error);
      },
    });
   
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 
  onCategorySelect(category: Category) {
     this.selectedCategoryId = category.id;
     console.log('Categoria selecionada:', category);
     // Aqui você pode filtrar produtos, etc.
  }

}
