import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasPage } from './pages/categorias/categorias.page';
import { CategoriaFormPage } from './pages/categoria-form/categoria-form.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  },
  {
    path: 'nueva',
    component: CategoriaFormPage
  },
  {
    path: ':id/editar',
    component: CategoriaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule {}
