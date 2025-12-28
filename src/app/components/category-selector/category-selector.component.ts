import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Category {
  id: number;
  user_id: number;
  nome: string;
  position: number;
}

@Component({
  selector: 'app-category-selector',
  imports: [CommonModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {
  
@Input() categories: any[] = [];
@Input() selectedId?: number;

@Output() categoryChange = new EventEmitter<Category>();

get selectedCategory(): Category | undefined {
  return this.categories.find(c => c.id === this.selectedId);
}

selectCategory(category: Category) {
  this.categoryChange.emit(category);
}

}
