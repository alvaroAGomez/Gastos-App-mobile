import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading: HTMLIonLoadingElement | null = null;
  private loadingCounter = 0;

  constructor(private loadingController: LoadingController) {}

  async show(message: string = 'Cargando...'): Promise<void> {
    this.loadingCounter++;

    if (this.loading) {
      return;
    }

    this.loading = await this.loadingController.create({
      message,
      spinner: 'crescent'
    });

    await this.loading.present();
  }

  async hide(): Promise<void> {
    this.loadingCounter--;

    if (this.loadingCounter <= 0) {
      this.loadingCounter = 0;
      
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
      }
    }
  }

  async forceHide(): Promise<void> {
    this.loadingCounter = 0;
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
