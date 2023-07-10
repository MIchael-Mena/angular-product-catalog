import {Component, HostListener, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {ThemeService} from "../../../../service/theme.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMdOrGreaterThan: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateWindowWidth();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.updateWindowWidth();
  }

  ngOnInit() {
  }

  public switchTheme() {
    this.themeService.changeTheme();
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
