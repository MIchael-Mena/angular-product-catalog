import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilterComponent} from './filter.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MaterialModule} from "../../../../shared/material.module";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [MaterialModule, MatExpansionModule, NgxMaskDirective, NgxMaskPipe],
      providers: [provideNgxMask()]
    });
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
