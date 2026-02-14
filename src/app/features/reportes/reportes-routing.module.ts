import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/reportes-home/reportes-home.module').then(m => m.ReportesHomePageModule)
  },
  {
    path: 'gastos-mensuales',
    loadChildren: () => import('./pages/reporte-gastos-mensuales/reporte-gastos-mensuales.module').then(m => m.ReporteGastosMensualesPageModule)
  },
  {
    path: 'por-categoria',
    loadChildren: () => import('./pages/reporte-por-categoria/reporte-por-categoria.module').then(m => m.ReportePorCategoriaPageModule)
  },
  {
    path: 'por-tarjeta',
    loadChildren: () => import('./pages/reporte-por-tarjeta/reporte-por-tarjeta.module').then(m => m.ReportePorTarjetaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule {}
