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
  private timedOutCloser: any;

  constructor() {
  }

  mouseEnter(trigger: any) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger: any) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 250);
  }

}
