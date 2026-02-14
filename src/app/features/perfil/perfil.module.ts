import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilPage } from './pages/perfil/perfil.page';

@NgModule({
  declarations: [PerfilPage],
  imports: [
    SharedModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule {}
