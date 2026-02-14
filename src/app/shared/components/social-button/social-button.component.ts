import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SocialProvider } from '../../../core/models/social-auth.models';

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss'],
  standalone: false
})
export class SocialButtonComponent {
  @Input() provider!: SocialProvider;
  @Input() label: string = '';
  @Input() loading: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  get iconName(): string {
    switch (this.provider) {
      case SocialProvider.GOOGLE: return 'logo-google';
      case SocialProvider.TWITTER: return 'logo-twitter'; // Or 'logo-x' if available in newer ionicons
      case SocialProvider.FACEBOOK: return 'logo-facebook';
      case SocialProvider.APPLE: return 'logo-apple';
      default: return '';
    }
  }

  get buttonClass(): string {
    return `social-btn ${this.provider}`;
  }

  handleClick() {
    if (!this.loading) {
      this.onClick.emit();
    }
  }
}
