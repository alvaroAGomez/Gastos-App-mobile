import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

// Pages
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

@NgModule({
  declarations: [
    LoginPage,
    RegisterPage
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
