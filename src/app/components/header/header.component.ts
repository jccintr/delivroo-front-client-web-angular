import { Component, Input } from '@angular/core';
import { StatusComponent } from "../status/status.component";

@Component({
  selector: 'app-header',
  imports: [StatusComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input() storeData: any = {};

}
