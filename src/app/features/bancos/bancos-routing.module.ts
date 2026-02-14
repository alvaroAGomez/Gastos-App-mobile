import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BancosPage } from './pages/bancos/bancos.page';

const routes: Routes = [
  {
    path: '',
    component: BancosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancosRoutingModule {}
