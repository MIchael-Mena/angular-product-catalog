import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UtilityComponent} from './utility.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {FormatPricePipe} from "../../../pipe/format-price.pipe";
import {MatBadgeModule} from "@angular/material/badge";

describe('UtilityComponent', () => {
  let component: UtilityComponent;
  let fixture: ComponentFixture<UtilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilityComponent],
      imports: [MatDialogModule, MatIconModule, FormatPricePipe, MatBadgeModule]
    });
    fixture = TestBed.createComponent(UtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
