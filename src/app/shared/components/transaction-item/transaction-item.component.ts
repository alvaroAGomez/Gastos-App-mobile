import { Component, Input } from '@angular/core';
import { GastoDashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false,
})
export class TransactionItemComponent {
  @Input() gasto!: GastoDashboard;
  @Input() isLast: boolean = false;

  constructor() {}
}
