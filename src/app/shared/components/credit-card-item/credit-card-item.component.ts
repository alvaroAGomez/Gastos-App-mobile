import { Component, Input } from '@angular/core';
import { TarjetaDashboard } from '../../models/dashboard.model';

@Component({
  selector: 'app-credit-card-item',
  templateUrl: './credit-card-item.component.html',
  styleUrls: ['./credit-card-item.component.scss'],
  standalone: false,
})
export class CreditCardItemComponent {
  @Input() tarjeta!: TarjetaDashboard;

  constructor() {}
}
