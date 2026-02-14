import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CuotasRoutingModule } from './cuotas-routing.module';
import { CuotasPendientesPage } from './pages/cuotas-pendientes/cuotas-pendientes.page';
import { CuotasResumenPage } from './pages/cuotas-resumen/cuotas-resumen.page';

@NgModule({
  declarations: [
    CuotasPendientesPage,
    CuotasResumenPage
  ],
  imports: [
    SharedModule,
    CuotasRoutingModule
  ]
})
export class CuotasModule {}
