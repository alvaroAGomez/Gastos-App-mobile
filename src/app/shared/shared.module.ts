import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

// Components
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { FiltrosReportesComponent } from './components/filtros-reportes/filtros-reportes.component';
import { ExpenseChartsComponent } from './components/expense-charts/expense-charts.component';
import { SocialButtonComponent } from './components/social-button/social-button.component';

const COMPONENTS = [
  AppHeaderComponent,
  EmptyStateComponent,
  FiltrosReportesComponent,
  ExpenseChartsComponent,
  SocialButtonComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective
  ],
  exports: [
    ...COMPONENTS,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective
  ]
})
export class SharedModule {}
 