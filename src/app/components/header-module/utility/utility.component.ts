import {Component} from '@angular/core';
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {LoginComponent} from "../../login-register/login/login.component";
import {RegisterComponent} from "../../login-register/register/register.component";

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss']
})
export class UtilityComponent {

  public shoppingCounter: number = 0;
  public totalPrices: number = 0;

  constructor(private shoppingCartService: ShoppingCartService,
              private dialog: MatDialog) {
    this.shoppingCartService.getCartItemCount().subscribe((currentCounter: number) => {
        this.shoppingCounter = currentCounter;
        this.totalPrices = this.shoppingCartService.getCurrentPrice();
      }
    )
  }

  public cleanCart(): void {
    this.shoppingCartService.cleanCart();
  }

  public openDialog(): void {
    if (this.shoppingCounter === 0) return;
    const data = {
      title: 'Confirmar',
      message: '¿Estás seguro de que quieres vaciar el carrito?',
      buttonDismiss: 'Cancelar',
      buttonConfirm: 'Vaciar',
    }
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data,
      width: '350px',
      maxWidth: '95vw',
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.cleanCart();
      }
    });
  }

  public openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'register') {
        this.openRegisterDialog();
      }
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '300px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}
