import {Component} from '@angular/core';
import {CATEGORIES} from "../model/categories";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public readonly categories = CATEGORIES;
  private timedOutCloser: any;

  constructor() {
  }

  public mouseEnter(trigger: any) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  public mouseLeave(trigger: any) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 250);
  }

  public transformName(name: string): string {
    return name.replace(/\s+/g, '_');
  }

}
