import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { LoadingService } from '../../../../core/services/loading.service';
import { SocialAuthService } from '../../../../core/services/social-auth.service';
import { SocialProvider } from '../../../../core/models/social-auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  SocialProvider = SocialProvider;
  isLoading = false;
  isLoadingSocial = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.toastService.showError('Por favor completa todos los campos correctamente');
      return;
    }

    try {
      this.isLoading = true;
      await this.loadingService.show('Verificando credenciales...');
      
      this.authService.login(this.loginForm.value).subscribe({
        next: async (response) => {
          await this.loadingService.hide();
          await this.toastService.showSuccess('¡Bienvenido!');
          this.router.navigate(['/app/dashboard']);
        },
        error: async (error) => {
          await this.loadingService.hide();
          this.isLoading = false;
          console.error('Login error:', error);
          this.toastService.showError('Error al iniciar sesión');
        }
      });
    } catch (error) {
      await this.loadingService.hide();
      this.isLoading = false;
      console.error('Login error:', error);
      this.toastService.showError('Error inesperado');
    }
  }

  async onSocialLogin(provider: SocialProvider) {
    if (this.isLoadingSocial) return;

    try {
      this.isLoadingSocial = true;
      await this.loadingService.show(`Conectando con ${this.getProviderName(provider)}...`);
      
      let result;
      
      switch (provider) {
        case SocialProvider.GOOGLE:
          result = await this.socialAuthService.loginWithGoogle();
          break;
        case SocialProvider.FACEBOOK:
          result = await this.socialAuthService.loginWithFacebook();
          break;
        case SocialProvider.APPLE:
          result = await this.socialAuthService.loginWithApple();
          break;
        default:
          this.toastService.showInfo('Proveedor no disponible actualmente');
          break;
      }
      
      if (result) {
        // TODO: Validate with backend here using authService
        await this.loadingService.hide();
        await this.toastService.showSuccess(`¡Bienvenido ${result.user?.name || ''}!`);
        this.router.navigate(['/app/dashboard']);
      }
      
    } catch (error) {
      console.error('Social Login Error:', error);
      await this.loadingService.hide();
      this.toastService.showError('Error en autenticación social');
    } finally {
      this.isLoadingSocial = false;
    }
  }

  onForgotPassword() {
    this.toastService.showInfo('Funcionalidad de recuperación próximamente');
  }

  private getProviderName(provider: SocialProvider): string {
    switch (provider) {
      case SocialProvider.GOOGLE: return 'Google';
      case SocialProvider.FACEBOOK: return 'Facebook';
      case SocialProvider.APPLE: return 'Apple';
      default: return 'red social';
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
