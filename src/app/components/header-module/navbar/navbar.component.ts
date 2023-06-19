import {Component} from '@angular/core';
import {CATEGORIES} from "../model/categories";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public baseUrl = '/productos';
  public readonly categories = CATEGORIES;

  constructor() {
  }

}
