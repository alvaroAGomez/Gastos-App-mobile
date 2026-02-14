import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasPage } from './pages/categorias/categorias.page';
import { CategoriaFormPage } from './pages/categoria-form/categoria-form.page';

@NgModule({
  declarations: [
    CategoriasPage,
    CategoriaFormPage
  ],
  imports: [
    SharedModule,
    CategoriasRoutingModule
  ]
})
export class CategoriasModule {}
