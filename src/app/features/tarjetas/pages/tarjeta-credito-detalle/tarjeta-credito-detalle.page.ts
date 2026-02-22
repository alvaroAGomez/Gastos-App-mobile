import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarjetasCreditoService } from '../../services/tarjetas-credito.service';
import { GastosService } from '../../../gastos/services/gastos.service';
import { TarjetaCredito } from '../../models/tarjeta.model';
import { GastoListadoItem } from '../../../gastos/models/gasto.model';
import { MOCK_TARJETAS_CREDITO } from '../../mocks/tarjetas.mock';
import { MOCK_GASTOS } from '../../../gastos/mocks/gastos.mock';
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

  gastosRecientes: GastoListadoItem[] = [];
  planesActivos: GastoListadoItem[] = [];
  gastosRecurrentes: GastoListadoItem[] = [];

  private loadMovimientos() {
    if (!this.tarjetaId) return;

    this.gastosService.getGastosPaginados({ tarjetaId: this.tarjetaId, limit: 30 }).subscribe({
      next: (res) => {
        let all = res.gastos || [];
        
        if (all.length === 0) {
          // Fallback to MOCK_GASTOS filtered by a representative mapping
          // (since mock IDs might not match strictly, we take those similar to the requested tarjeta)
          all = MOCK_GASTOS.filter(g => g.tarjeta.id === 1 || g.tarjeta.id === this.tarjetaId);
        }

        this.processMovimientos(all);
        this.loading = false;
      },
      error: () => {
        const all = MOCK_GASTOS.filter(g => g.tarjeta.id === 1);
        this.processMovimientos(all);
        this.loading = false;
      }
    });
  }

  private processMovimientos(all: GastoListadoItem[]) {
    this.planesActivos = all.filter(g => (g.totalCuotas || 0) > 0);
    this.gastosRecurrentes = all.filter(g => g.esDebitoAuto);
    this.gastosRecientes = all.filter(g => !(g.totalCuotas || 0) && !g.esDebitoAuto);
  }

  mapToDashboardCard(t: TarjetaCredito): any {
    return {
      tarjetaId: t.id,
      nombreTarjeta: t.nombre,
      banco: t.banco,
      ultimos4: t.ultimosDigitos,
      limiteTotal: t.cupoTotal,
      limiteDisponible: t.cupoDisponible,
      gastosEsteMes: t.gastosMesActual || 0,
      porcentajeUso: Math.round(((t.gastosMesActual || 0) / t.cupoTotal) * 100),
      fechaCierre: `${t.diaCierre}/04`,
      color: t.color || '#1e1b4b'
    };
  }

  get gastoMensualCalculado(): number {
    if (!this.tarjeta) return 0;
    
    const sumRecientes = this.gastosRecientes.reduce((acc, g) => acc + g.monto, 0);
    const sumRecurrentes = this.gastosRecurrentes.reduce((acc, g) => acc + g.monto, 0);
    const sumCuotas = this.planesActivos.reduce((acc, g) => {
      return acc + (g.monto / (g.totalCuotas || 1));
    }, 0);

    return sumRecientes + sumRecurrentes + sumCuotas;
  }

  getProximoPagoPlan(g: GastoListadoItem): string {
    return "05 Mar"; // Mocked for UI visual
  }

  getRestantePlan(g: GastoListadoItem): number {
    return (g.totalCuotas! - g.cuotaActual!) * (g.monto / g.totalCuotas!);
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
