import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ReportesRoutingModule } from './reportes-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule {}
