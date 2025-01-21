import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './pages/userLogin/userLogin.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


@NgModule({
  declarations: [UserLoginComponent,ChangePasswordComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserLoginComponent }, // Default route for the login module
    ]),
  ]
})
export class LoginModule { }
