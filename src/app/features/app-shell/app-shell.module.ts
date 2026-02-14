import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AppShellRoutingModule } from './app-shell-routing.module';

// Pages
import { TabsPage } from './pages/tabs/tabs.page';

@NgModule({
  declarations: [
    TabsPage
  ],
  imports: [
    SharedModule,
    AppShellRoutingModule
  ]
})
export class AppShellModule {}
