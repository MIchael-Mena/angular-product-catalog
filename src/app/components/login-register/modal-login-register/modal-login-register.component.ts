import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-login-register',
  templateUrl: './modal-login-register.component.html',
  styleUrls: ['./modal-login-register.component.scss']
})
export class ModalLoginRegisterComponent {

  constructor(public dialogRef: MatDialogRef<ModalLoginRegisterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  public closeModal(): void {
    this.dialogRef.close();
  }


}
