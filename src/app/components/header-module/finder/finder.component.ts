import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent {

  public clearInput(): void {
    this.searchControl.reset();
    this.pristine = true;
  }

  public handleInputChange(): void {
    this.pristine = false;
  }

  public searchControl: FormControl = new FormControl({value: '', disabled: false});
  public pristine: boolean = true;

}
