import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TarjetasRoutingModule } from './tarjetas-routing.module';

// Pages
import { TarjetasHomePage } from './pages/tarjetas-home/tarjetas-home.page';
import { TarjetaCreditoFormPage } from './pages/tarjeta-credito-form/tarjeta-credito-form.page';
import { TarjetaDebitoFormPage } from './pages/tarjeta-debito-form/tarjeta-debito-form.page';
import { TarjetaCreditoDetallePage } from './pages/tarjeta-credito-detalle/tarjeta-credito-detalle.page';
import { TarjetaCreditoProyeccionPage } from './pages/tarjeta-credito-proyeccion/tarjeta-credito-proyeccion.page';
import { TarjetaCuotasPendientesPage } from './pages/tarjeta-cuotas-pendientes/tarjeta-cuotas-pendientes.page';

@NgModule({
  declarations: [
    TarjetasHomePage,
    TarjetaCreditoFormPage,
    TarjetaDebitoFormPage,
    TarjetaCreditoDetallePage,
    TarjetaCreditoProyeccionPage,
    TarjetaCuotasPendientesPage
  ],
  imports: [
    SharedModule,
    TarjetasRoutingModule
  ]
})
export class TarjetasModule {}
