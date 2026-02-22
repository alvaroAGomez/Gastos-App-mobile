import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetasHomePage } from './pages/tarjetas-home/tarjetas-home.page';
import { TarjetaCreditoFormPage } from './pages/tarjeta-credito-form/tarjeta-credito-form.page';
import { TarjetaDebitoFormPage } from './pages/tarjeta-debito-form/tarjeta-debito-form.page';
import { TarjetaCreditoDetallePage } from './pages/tarjeta-credito-detalle/tarjeta-credito-detalle.page';
import { TarjetaCreditoProyeccionPage } from './pages/tarjeta-credito-proyeccion/tarjeta-credito-proyeccion.page';
import { TarjetaCuotasPendientesPage } from './pages/tarjeta-cuotas-pendientes/tarjeta-cuotas-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: TarjetasHomePage
  },
  {
    path: 'credito/nueva',
    component: TarjetaCreditoFormPage
  },
  {
    path: 'credito/:id',
    component: TarjetaCreditoDetallePage
  },
  {
    path: 'credito/:id/proyeccion',
    component: TarjetaCreditoProyeccionPage
  },
  {
    path: 'credito/:id/cuotas',
    component: TarjetaCuotasPendientesPage
  },
  {
    path: 'credito/:id/editar',
    component: TarjetaCreditoFormPage
  },
  {
    path: 'debito/nueva',
    component: TarjetaDebitoFormPage
  },
  {
    path: 'debito/:id/editar',
    component: TarjetaDebitoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarjetasRoutingModule {}
