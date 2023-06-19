import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UtilityComponent} from './utility.component';

describe('UtilitysComponent', () => {
  let component: UtilityComponent;
  let fixture: ComponentFixture<UtilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilityComponent]
    });
    fixture = TestBed.createComponent(UtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
