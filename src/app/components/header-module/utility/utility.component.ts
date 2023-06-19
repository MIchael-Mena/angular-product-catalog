import {Component} from '@angular/core';
import {ShoppingCartService} from "../../../service/shopping-cart.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

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

}
