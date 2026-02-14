import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportePorCategoriaPage } from './reporte-por-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ReportePorCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportePorCategoriaPageRoutingModule {}
