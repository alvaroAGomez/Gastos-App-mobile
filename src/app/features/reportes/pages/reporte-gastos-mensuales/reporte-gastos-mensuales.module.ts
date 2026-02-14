import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ReporteGastosMensualesPageRoutingModule } from './reporte-gastos-mensuales-routing.module';
import { ReporteGastosMensualesPage } from './reporte-gastos-mensuales.page';

@NgModule({
  declarations: [ReporteGastosMensualesPage],
  imports: [
    SharedModule,
    ReporteGastosMensualesPageRoutingModule
  ]
})
export class ReporteGastosMensualesPageModule {}
