import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FinderComponent} from './finder.component';
// import {MatFormFieldModule} from "@angular/material/form-field";
import {MaterialModule} from "../../../../shared/material.module";
import {FormsModule} from "@angular/forms";

describe('FinderComponent', () => {
  let component: FinderComponent;
  let fixture: ComponentFixture<FinderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinderComponent],
      imports: [MaterialModule, FormsModule]
    });
    fixture = TestBed.createComponent(FinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
