import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginRegisterComponent } from './modal-login-register.component';

describe('ModalLoginRegisterComponent', () => {
  let component: ModalLoginRegisterComponent;
  let fixture: ComponentFixture<ModalLoginRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalLoginRegisterComponent]
    });
    fixture = TestBed.createComponent(ModalLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
