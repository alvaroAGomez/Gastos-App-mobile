import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesHomePage } from './reportes-home.page';

const routes: Routes = [
  {
    path: '',
    component: ReportesHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesHomePageRoutingModule {}
