import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportePorTarjetaPage } from './reporte-por-tarjeta.page';

const routes: Routes = [
  {
    path: '',
    component: ReportePorTarjetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportePorTarjetaPageRoutingModule {}
