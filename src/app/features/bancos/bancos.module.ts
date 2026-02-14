import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BancosRoutingModule } from './bancos-routing.module';
import { BancosPage } from './pages/bancos/bancos.page';

@NgModule({
  declarations: [BancosPage],
  imports: [
    SharedModule,
    BancosRoutingModule
  ]
})
export class BancosModule {}
