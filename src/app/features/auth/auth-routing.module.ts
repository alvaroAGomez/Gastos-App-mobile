import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { GuestGuard } from '../../core/guards/guest.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [GuestGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
