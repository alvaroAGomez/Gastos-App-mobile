import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.toastService.showError('Por favor completa todos los campos correctamente');
      return;
    }

    try {
      await this.loadingService.show('Registrando...');

      const { confirmPassword, ...registerDto } = this.registerForm.value;

      this.authService.register(registerDto).subscribe({
        next: async (response) => {
          await this.loadingService.hide();
          await this.toastService.showSuccess('¡Registro exitoso!');
          this.router.navigate(['/app/dashboard']);
        },
        error: async (error) => {
          await this.loadingService.hide();
          console.error('Register error:', error);
        }
      });
    } catch (error) {
      await this.loadingService.hide();
      console.error('Register error:', error);
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
