import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FinderComponent} from './finder.component';
import {MaterialModule} from "../../../shared/material.module";
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('FinderComponent', () => {
  let component: FinderComponent;
  let fixture: ComponentFixture<FinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinderComponent],
      imports: [MaterialModule, FormsModule, NoopAnimationsModule]
    });
    fixture = TestBed.createComponent(FinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
