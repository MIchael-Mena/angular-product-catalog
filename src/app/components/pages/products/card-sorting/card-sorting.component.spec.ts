import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSortingComponent } from './card-sorting.component';

describe('CardSortingComponent', () => {
  let component: CardSortingComponent;
  let fixture: ComponentFixture<CardSortingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardSortingComponent]
    });
    fixture = TestBed.createComponent(CardSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
