import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
//searchText: string = '';
  @Output() setSearchText = new EventEmitter<string>();

  /*
  onSearchChange() {
    console.log(this.searchText);
    this.searchChange.emit(this.searchText.toLowerCase().trim());
  }
*/
  onChangeInput(event: Event){

      this.setSearchText.emit((event.target as HTMLInputElement).value);

  }
}
