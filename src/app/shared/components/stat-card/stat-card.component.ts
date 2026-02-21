import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  standalone: false,
})
export class StatCardComponent {
  @Input() label: string = '';
  @Input() value: number = 0;
  @Input() trend?: string;
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() icon?: string;
  @Input() description?: string;

  constructor() {}
}
