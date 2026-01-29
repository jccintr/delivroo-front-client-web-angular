import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from "../components/header/header.component";
import { Category, CategorySelectorComponent } from "../components/category-selector/category-selector.component";
import { SearchComponent } from "../components/search/search.component";
import { ProductListComponent } from "../components/product-list/product-list.component";
import { CartStatusComponent } from "../components/cart-status/cart-status.component";
import { PaymentService } from '../services/payment.service';
import { FeeService } from '../services/fee.service';
import { PizzasService } from '../services/pizzas.service';

@Component({
  selector: 'app-store',
  imports: [HeaderComponent, CategorySelectorComponent, SearchComponent, ProductListComponent, CartStatusComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit, OnDestroy {
  isLoading = signal(true);        
  hasError  = signal(false);
  storeName: string = '';
  store: any = {};
  storeData: any = {};
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];   
  searchTerm = signal('');
  selectedCategoryId: number = 1;
   private subscription: Subscription = new Subscription();
  
  constructor(
    private route: ActivatedRoute, 
    private storeService: StoreService,
    private router: Router,
    private paymentService: PaymentService,
    private feeService: FeeService,
    private pizzasService: PizzasService
  ) {
    
    effect(() => {
      const termo = this.searchTerm().toLowerCase();
      this.filteredProducts = this.products.filter((product) =>
        product.nome.toLowerCase().includes(termo) || product.descricao.toLowerCase().includes(termo)
      );
     
    });
  }

  ngOnInit(): void {
    this.storeName = this.route.snapshot.paramMap.get('store')!;
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
       
       
        this.paymentService.setPayments(response.pagamentos);
        this.feeService.setFees(response.taxas);
        this.pizzasService.setPizzas(response.pizzas);
        this.pizzasService.setBordas(response.bordas);
        this.categories = response.categorias;
        if (this.categories.length > 0) {
            this.selectedCategoryId = this.categories[0].id;
         }
         this.products = response.produtos;
         this.filteredProducts = [...this.products];
         this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Erro ao carregar dados da loja:', error);
        this.hasError.set(true);
        this.isLoading.set(false);
        this.router.navigate(['/storeNotFound']);
      },
    });
   
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onCategorySelect(category: Category) {
     this.selectedCategoryId = category.id;
    setTimeout(() => {
      const element = document.getElementById('categoria-' + category.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      }
    }, 200); // 100ms cos
     
  }

}
