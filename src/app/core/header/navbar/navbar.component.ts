import {Component} from '@angular/core';
import {CATEGORIES} from "../model/categories";
import {formatToTextWithoutSpaces} from "../../../shared/functions/stringUtils";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public readonly categories = CATEGORIES;
  protected readonly formatToTextWithoutSpaces = formatToTextWithoutSpaces;
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


}
