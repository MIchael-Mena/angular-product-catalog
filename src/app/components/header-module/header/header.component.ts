import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // @ts-ignore
  public isMdOrGreaterThan: boolean;
  // @ts-ignore
  public isSmOrLower: boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateWindowWidth();
  }
  constructor(private router: Router) {
    this.updateWindowWidth();
  }

  private updateWindowWidth() {
    this.isMdOrGreaterThan = window.innerWidth >= 768;
    this.isSmOrLower = window.innerWidth < 768;
  }

}
