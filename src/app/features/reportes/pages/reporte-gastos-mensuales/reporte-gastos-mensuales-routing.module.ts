import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteGastosMensualesPage } from './reporte-gastos-mensuales.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteGastosMensualesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReporteGastosMensualesPageRoutingModule {}
