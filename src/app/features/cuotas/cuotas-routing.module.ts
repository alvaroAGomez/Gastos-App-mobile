import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuotasPendientesPage } from './pages/cuotas-pendientes/cuotas-pendientes.page';
import { CuotasResumenPage } from './pages/cuotas-resumen/cuotas-resumen.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pendientes',
    pathMatch: 'full'
  },
  {
    path: 'pendientes',
    component: CuotasPendientesPage
  },
  {
    path: 'resumen',
    component: CuotasResumenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuotasRoutingModule {}
