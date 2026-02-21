import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarjetasCreditoService } from '../../services/tarjetas-credito.service';
import { TarjetasDebitoService } from '../../services/tarjetas-debito.service';
import { TarjetaCredito, TarjetaDebito } from '../../models/tarjeta.model';
import { MOCK_TARJETAS_CREDITO, MOCK_TARJETAS_DEBITO } from '../../mocks/tarjetas.mock';

@Component({
  selector: 'app-tarjetas-home',
  templateUrl: './tarjetas-home.page.html',
  styleUrls: ['./tarjetas-home.page.scss'],
  standalone: false,
})
export class TarjetasHomePage implements OnInit {
  segment: 'credito' | 'debito' = 'credito';
  tarjetasCredito: TarjetaCredito[] = [];
  tarjetasDebito: TarjetaDebito[] = [];
  deudaTotal: number = 0;
  loading = true;

  constructor(
    private tcService: TarjetasCreditoService,
    private tdService: TarjetasDebitoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTarjetas();
  }

  loadTarjetas() {
    this.loading = true;
    
    // Load Credit Cards
    this.tcService.getAll().subscribe({
      next: (data) => {
        this.tarjetasCredito = (data && data.length > 0) ? data : MOCK_TARJETAS_CREDITO;
        this.calculateTotalDeuda();
        this.loading = false;
      },
      error: () => {
        console.log('Using mock credit cards');
        this.tarjetasCredito = MOCK_TARJETAS_CREDITO;
        this.calculateTotalDeuda();
        this.loading = false;
      }
    });

    // Load Debit Cards
    this.tdService.getAll().subscribe({
      next: (data) => {
        this.tarjetasDebito = (data && data.length > 0) ? data : MOCK_TARJETAS_DEBITO;
      },
      error: () => {
        console.log('Using mock debit cards');
        this.tarjetasDebito = MOCK_TARJETAS_DEBITO;
      }
    });
  }

  calculateTotalDeuda() {
    this.deudaTotal = this.tarjetasCredito.reduce((sum, t) => sum + (t.gastosMesActual || 0), 0);
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

  goToDetail(id: number) {
    this.router.navigate(['/app/tarjetas/credito', id]);
  }

  getPorcentajeConsumo(t: TarjetaCredito): number {
    if (!t.cupoTotal) return 0;
    return Math.round(((t.gastosMesActual || 0) / t.cupoTotal) * 100);
  }

  getBarColor(porcentaje: number): string {
    if (porcentaje < 40) return '#10b981'; // green
    if (porcentaje < 75) return '#f59e0b'; // orange
    return '#ef4444'; // red
  }

  mapToDashboardCard(t: any): any {
    if (this.segment === 'credito') {
      const porcentaje = this.getPorcentajeConsumo(t);
      return {
        id: t.id,
        nombreTarjeta: t.nombre,
        banco: t.banco,
        ultimos4: t.ultimosDigitos,
        limiteTotal: t.cupoTotal,
        limiteDisponible: t.cupoDisponible,
        gastosEsteMes: t.gastosMesActual || 0,
        porcentajeUso: porcentaje,
        fechaCierre: `${t.diaCierre}/04`, // Hardcoded month for demo visual
        color: t.color || '#1e1b4b'
      };
    } else {
      return {
        id: t.id,
        nombreTarjeta: t.nombre,
        banco: t.banco,
        ultimos4: t.ultimosDigitos,
        limiteTotal: t.saldo, // Using saldo as limit for visual consistency in list
        limiteDisponible: t.saldo,
        gastosEsteMes: 0,
        porcentajeUso: 0,
        color: t.color || '#1e1b4b'
      };
    }
  }

}
