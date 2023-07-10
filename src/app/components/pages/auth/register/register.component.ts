import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageSessionService} from "../../../../service/storage-session.service";
import {User} from "../model/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  @Output() onClosed: EventEmitter<any> = new EventEmitter<any>();
  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private storageSessionService: StorageSessionService) {
    this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$')]],
        confirmPassword: ['', [Validators.required]],
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern('[0-9]{7,}')]],
        areaCode: ['', [Validators.required, Validators.pattern('[0-9]{0,3}')]],
        dni: ['', [Validators.required, Validators.pattern('[0-9]{6,8}')]],
      },
      {
        validators: this.passwordMatchValidator
      });
  }

  public dismissRegister(): void {
    this.onClosed.emit(null);
  }

  public registerUser(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsDirty();
      });
      return;
    }
    delete this.registerForm.value.confirmPassword;
    this.storageSessionService.saveUser(<User>this.registerForm.value);
    this.onClosed.emit('Registro exitoso');
  }

  private passwordMatchValidator(form: FormGroup): null | object {
    const passwordControl = form.controls['password']
    const confirmPasswordControl = form.controls['confirmPassword']
    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({passwordMismatch: true});
    } else {
      confirmPasswordControl.setErrors(null);
    }
    return null;
  }

}
