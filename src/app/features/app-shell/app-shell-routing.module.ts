import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'gastos',
        loadChildren: () => import('../gastos/gastos.module').then(m => m.GastosModule)
      },
      {
        path: 'tarjetas',
        loadChildren: () => import('../tarjetas/tarjetas.module').then(m => m.TarjetasModule)
      },
      {
        path: 'cuotas',
        loadChildren: () => import('../cuotas/cuotas.module').then(m => m.CuotasModule)
      },
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule)
      },
      {
        path: 'bancos',
        loadChildren: () => import('../bancos/bancos.module').then(m => m.BancosModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilModule)
      },
      {
        path: 'reportes',
        loadChildren: () => import('../reportes/reportes.module').then(m => m.ReportesModule)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppShellRoutingModule {}
