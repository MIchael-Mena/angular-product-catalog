import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {MaterialModule} from "../shared/material.module";
import {ModalLoginRegisterComponent} from './pages/modal-login-register/modal-login-register.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ModalLoginRegisterComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    MatTabsModule,
    MatTooltipModule
  ],
  exports: [
    // ModalLoginRegisterComponent // No es necesario exportar el componente, ya que es un modal
  ]
})
export class AuthModule {
}
