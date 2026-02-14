import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { ReportesHomePageRoutingModule } from './reportes-home-routing.module';
import { ReportesHomePage } from './reportes-home.page';

@NgModule({
  declarations: [ReportesHomePage],
  imports: [
    SharedModule,
    ReportesHomePageRoutingModule
  ]
})
export class ReportesHomePageModule {}
