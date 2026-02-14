import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GastosListadoPage } from './pages/gastos-listado/gastos-listado.page';
import { GastoFormPage } from './pages/gasto-form/gasto-form.page';
import { GastoDetallePage } from './pages/gasto-detalle/gasto-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: GastosListadoPage
  },
  {
    path: 'nuevo',
    component: GastoFormPage
  },
  {
    path: ':id',
    component: GastoDetallePage
  },
  {
    path: ':id/editar',
    component: GastoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosRoutingModule {}
