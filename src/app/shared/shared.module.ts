import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

// Components
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { FiltrosReportesComponent } from './components/filtros-reportes/filtros-reportes.component';
import { ExpenseChartsComponent } from './components/expense-charts/expense-charts.component';
import { SocialButtonComponent } from './components/social-button/social-button.component';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { CreditCardItemComponent } from './components/credit-card-item/credit-card-item.component';
import { TransactionItemComponent } from './components/transaction-item/transaction-item.component';

// Pipes
import { SumMontoPipe } from './pipes/sum-monto.pipe';

const COMPONENTS = [
  AppHeaderComponent,
  EmptyStateComponent,
  FiltrosReportesComponent,
  ExpenseChartsComponent,
  SocialButtonComponent,
  StatCardComponent,
  ActionButtonComponent,
  CreditCardItemComponent,
  TransactionItemComponent
];

const PIPES = [
  SumMontoPipe
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    RouterModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective
  ]
})

export class SharedModule {}
 