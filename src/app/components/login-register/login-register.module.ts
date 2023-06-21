import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {MaterialModule} from "../../shared/material.module";
import {ModalLoginRegisterComponent} from './modal-login-register/modal-login-register.component';
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
  ]
})
export class LoginRegisterModule {
}
