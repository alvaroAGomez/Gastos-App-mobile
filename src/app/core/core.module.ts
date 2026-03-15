import { NgModule, ModuleWithProviders, Optional, SkipSelf, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

// Services
import { StorageService } from './services/storage.service';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';
import { LoadingService } from './services/loading.service';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

export function initializeApp(storageService: StorageService) {
  return (): Promise<any> => {
    return storageService.init();
  };
}

@NgModule({
  imports: [
    CommonModule,
    IonicStorageModule.forRoot()
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya está cargado. Importar solo en AppModule.');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        StorageService,
        ApiService,
        AuthService,
        ToastService,
        LoadingService,
        AuthGuard,
        GuestGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoadingInterceptor,
          multi: true
        },
        {
          provide: APP_INITIALIZER,
          useFactory: initializeApp,
          deps: [StorageService],
          multi: true
        }
      ]
    };
  }
}
