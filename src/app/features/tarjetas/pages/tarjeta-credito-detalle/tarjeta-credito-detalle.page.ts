import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarjetasCreditoService } from '../../services/tarjetas-credito.service';
import { GastosService } from '../../../gastos/services/gastos.service';
import { TarjetaCredito } from '../../models/tarjeta.model';
import { GastoListadoItem } from '../../../gastos/models/gasto.model';
import { MOCK_TARJETAS_CREDITO } from '../../mocks/tarjetas.mock';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tarjeta-credito-detalle',
  templateUrl: './tarjeta-credito-detalle.page.html',
  styleUrls: ['./tarjeta-credito-detalle.page.scss'],
  standalone: false,
})
export class TarjetaCreditoDetallePage implements OnInit {
  tarjetaId: number | null = null;
  tarjeta: TarjetaCredito | null = null;
  movimientos: GastoListadoItem[] = [];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tcService: TarjetasCreditoService,
    private gastosService: GastosService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tarjetaId = +id;
      this.loadData();
    }
  }

  loadData() {
    if (!this.tarjetaId) return;
    this.loading = true;

    // Load Card Info
    this.tcService.getById(this.tarjetaId).subscribe({
      next: (t) => {
        this.tarjeta = t;
        this.loadMovimientos();
      },
      error: () => {
        // Fallback
        this.tarjeta = MOCK_TARJETAS_CREDITO.find(x => x.id === this.tarjetaId) || null;
        this.loadMovimientos();
      }
    });
  }

  private loadMovimientos() {
    if (!this.tarjetaId) return;

    this.gastosService.getGastosPaginados({ tarjetaId: this.tarjetaId, limit: 10 }).subscribe({
      next: (res) => {
        this.movimientos = res.gastos || [];
        this.loading = false;
      },
      error: () => {
        this.movimientos = []; // In a real app we might mock these too
        this.loading = false;
      }
    });
  }

  getPorcentajeConsumo(): number {
    if (!this.tarjeta || !this.tarjeta.cupoTotal) return 0;
    return Math.round(((this.tarjeta.gastosMesActual || 0) / this.tarjeta.cupoTotal) * 100);
  }

  async deleteTarjeta() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Tarjeta',
      message: '¿Estás seguro de que deseas eliminar esta tarjeta? Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Eliminar', 
          role: 'destructive',
          handler: () => {
            if (this.tarjetaId) {
              this.tcService.delete(this.tarjetaId).subscribe({
                next: async () => {
                  const toast = await this.toastCtrl.create({
                    message: 'Tarjeta eliminada con éxito',
                    duration: 2000,
                    color: 'success'
                  });
                  toast.present();
                  this.router.navigate(['/app/tarjetas']);
                }
              });
            }
          }
        }
      ]
    });
    alert.present();
  }

  editTarjeta() {
    if (this.tarjetaId) {
      this.router.navigate(['/app/tarjetas/credito', this.tarjetaId, 'editar']);
    }
  }
}
