import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalLoginRegisterComponent} from './modal-login-register.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthModule} from "../auth.module";

describe('ModalLoginRegisterComponent', () => {
  let component: ModalLoginRegisterComponent;
  let fixture: ComponentFixture<ModalLoginRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // declarations: [ModalLoginRegisterComponent],
      imports: [AuthModule],
      providers: [
        {provide: MatDialogRef, useValue: {}}, // Cuando se llama a MatDialogRef.close(), se llama a un método vacío.
        {provide: MAT_DIALOG_DATA, useValue: []},
      ]
    });
    fixture = TestBed.createComponent(ModalLoginRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
