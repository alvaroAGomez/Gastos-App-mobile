import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: false,
})
export class AppHeaderComponent {
  @Input() title: string = '';
  @Input() showBackButton: boolean = false;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
