import { Component } from '@angular/core';
import {IconRegistryService} from "./service/icon-registry.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'product-catalog';

  constructor(private iconRegistry: IconRegistryService) {
  }

}
