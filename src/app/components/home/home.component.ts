import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  items = ['CITE III', 'CITE IV', 'CITE V'];
  expandedIndex = 0;

}
