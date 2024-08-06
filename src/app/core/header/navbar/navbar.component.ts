import {Component} from '@angular/core';
import {CATEGORIES} from "../model/categories";
import {formatToTextWithUnderscores} from "../../../shared/functions/stringUtils";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  public readonly categories = CATEGORIES;
  protected readonly formatToTextWithoutSpaces = formatToTextWithUnderscores;
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
