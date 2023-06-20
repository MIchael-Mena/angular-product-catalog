import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  login(): void {
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;

      // Aquí puedes agregar la lógica para el inicio de sesión
      // Por ejemplo, puedes enviar una solicitud HTTP al backend
      // para autenticar al usuario y realizar otras acciones necesarias.
    } else {
      // Si el formulario es inválido, puedes realizar alguna acción,
      // como mostrar mensajes de error o realizar validaciones adicionales.
    }
  }

}
