import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnChanges{
 
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] || changes['categories']) {
      this.groupProductsByCategory();
    }
  }

  @Input() categories: any[] = [];
  @Input() products: any[] = [];

  categorizedProducts: { category: any; products: any[] }[] = [];

  private groupProductsByCategory(): void {
    if (!this.products?.length || !this.categories?.length) {
      this.categorizedProducts = [];
      return;
    }

    // Criamos um mapa com categoria como chave
    const map = new Map<any, any[]>();

    // Inicializa o mapa com todas as categorias (mesmo as sem produtos)
    this.categories.forEach(cat => {
      map.set(cat.id, []); // assumindo que categoria tem .id
    });

    // Agrupa os produtos por categoryId (ajuste o nome do campo se for diferente)
    this.products.forEach(product => {
      const catId = product.categoria_id; // ajuste conforme sua estrutura
      if (map.has(catId)) {
        map.get(catId)!.push(product);
      }
    });

    // Converte o mapa para array ordenado (mantendo a ordem das categorias)
    this.categorizedProducts = this.categories
      .map(cat => ({
        category: cat,
        products: map.get(cat.id) || []
      }))
      .filter(item => item.products.length > 0); // opcional: remove categorias vazias
      
  }
}
