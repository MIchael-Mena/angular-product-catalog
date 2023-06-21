import {Component} from '@angular/core';
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {ModalLoginRegisterComponent} from "../../login-register/modal-login-register/modal-login-register.component";
import {AuthService} from "../../../service/auth.service";

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.scss']
})
export class UtilityComponent {

  public shoppingCounter: number = 0;
  public totalPrices: number = 0;
  public isLogged: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService,
              private authService: AuthService,
              private dialog: MatDialog) {
    this.shoppingCartService.getCartItemCount().subscribe((currentCounter: number) => {
        this.shoppingCounter = currentCounter;
        this.totalPrices = this.shoppingCartService.getCurrentPrice();
      }
    )
    this.authService.onToggleLogin().subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    })
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

  public openLoginRegisterModal(): void {
    const dialogRef = this.dialog.open(ModalLoginRegisterComponent, {
      maxWidth: '95vw',
      // panelClass: 'custom-modal',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        alert(result)
      }
    });
  }


}
