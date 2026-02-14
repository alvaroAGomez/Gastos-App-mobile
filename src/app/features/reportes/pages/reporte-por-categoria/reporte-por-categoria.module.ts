import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ReportePorCategoriaPageRoutingModule } from './reporte-por-categoria-routing.module';
import { ReportePorCategoriaPage } from './reporte-por-categoria.page';

@NgModule({
  declarations: [ReportePorCategoriaPage],
  imports: [
    SharedModule,
    ReportePorCategoriaPageRoutingModule
  ]
})
export class ReportePorCategoriaPageModule {}
