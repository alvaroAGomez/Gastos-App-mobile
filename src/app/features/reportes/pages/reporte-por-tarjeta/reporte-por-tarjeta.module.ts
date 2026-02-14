import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ReportePorTarjetaPageRoutingModule } from './reporte-por-tarjeta-routing.module';
import { ReportePorTarjetaPage } from './reporte-por-tarjeta.page';

@NgModule({
  declarations: [ReportePorTarjetaPage],
  imports: [
    SharedModule,
    ReportePorTarjetaPageRoutingModule
  ]
})
export class ReportePorTarjetaPageModule {}
