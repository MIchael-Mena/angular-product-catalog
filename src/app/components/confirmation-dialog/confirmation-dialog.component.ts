import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DialogContent} from "./DialogContent";

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialog: DialogContent) {
  }

}
