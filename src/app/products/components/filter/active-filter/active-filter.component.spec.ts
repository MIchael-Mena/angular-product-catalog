import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveFilterComponent } from './active-filter.component';

describe('ActiveFilterComponent', () => {
  let component: ActiveFilterComponent;
  let fixture: ComponentFixture<ActiveFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveFilterComponent]
    });
    fixture = TestBed.createComponent(ActiveFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
