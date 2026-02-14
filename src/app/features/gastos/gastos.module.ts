import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { GastosRoutingModule } from './gastos-routing.module';

// Pages
import { GastosListadoPage } from './pages/gastos-listado/gastos-listado.page';
import { GastoFormPage } from './pages/gasto-form/gasto-form.page';
import { GastoDetallePage } from './pages/gasto-detalle/gasto-detalle.page';

@NgModule({
  declarations: [
    GastosListadoPage,
    GastoFormPage,
    GastoDetallePage
  ],
  imports: [
    SharedModule,
    GastosRoutingModule
  ]
})
export class GastosModule {}
