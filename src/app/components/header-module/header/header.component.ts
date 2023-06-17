import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isMdOrGreaterThan: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateWindowWidth();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.updateWindowWidth();
  }

  private updateWindowWidth() {
/*    this.breakpointObserver.observe([
      Breakpoints.Small, // < 600px
      // Breakpoints.Medium, // >= 960px
      // Breakpoints.Large, // >= 1280px
      // Breakpoints.XLarge // >= 1920px
    ]).subscribe(result => {
      this.isMdOrGreaterThan = result.matches;
    });*/
    this.isMdOrGreaterThan = window.innerWidth >= 768;
  }
}
