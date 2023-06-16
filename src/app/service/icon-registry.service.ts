import { Injectable } from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('account', sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/account.svg'));
  }

  public addSvgIconWithUrl(name: string, url: string) {
    this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(url));
  }

  public addSvgIcon(name: string, svg: string) {
    this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustHtml(svg));
  }




}
