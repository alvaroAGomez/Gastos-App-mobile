import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
import { GastosService } from '../../../gastos/services/gastos.service';
import { 
  DashboardSummary, 
  TarjetaDashboard, 
  GastoDashboard,
  ResumenFinancieroDto,
  ResumenTarjetaDashboard,
  DashboardTarjetasResponse
} from '../../../../shared/models/dashboard.model';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { GastoDashboardItem } from '../../../gastos/models/gasto.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage {
  summary: DashboardSummary = {
    totalDisponible: 0,
    gastosEsteMes: 0,
    proximoCierre: null
  };
  tarjetas: TarjetaDashboard[] = [];
  gastos: GastoDashboard[] = [];
  userName: string = 'Usuario';
  loading = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dashboardService: DashboardService,
    private gastosService: GastosService
  ) {}

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    // Obtener nombre del usuario desde el AuthService
    this.authService.getProfile().pipe(
      catchError(err => {
        console.error('Error obteniendo perfil:', err);
        return of({ ok: false, data: null } as ApiResponse<any>);
      })
    ).subscribe({
      next: (res: ApiResponse<any>) => {
        if (res.ok && res.data) {
          this.userName = res.data.nombre || 'Usuario';
        }
      }
    });

    forkJoin({
      resumen: this.dashboardService.getResumenFinanciero().pipe(catchError(() => of(null))),
      tarjetas: this.dashboardService.getResumenTarjetas().pipe(catchError(() => of(null))),
      gastos: this.gastosService.getGastosDashboard({}).pipe(catchError(() => of([])))
    }).subscribe({
      next: (res: { 
        resumen: ResumenFinancieroDto | null, 
        tarjetas: DashboardTarjetasResponse | null, 
        gastos: GastoDashboardItem[] 
      }) => {
        console.log('Dashboard Data Raw:', res);

        // 1. Resumen
        if (res.resumen) {
          this.summary = {
            totalDisponible: res.resumen.totalDisponible,
            gastosEsteMes: res.resumen.gastosEsteMes,
            proximoCierre: res.resumen.proximoCierre 
              ? `${res.resumen.proximoCierre.nombreTarjeta} (${new Date(res.resumen.proximoCierre.fecha).toLocaleDateString('es-AR', {day: 'numeric', month: 'short'})})`
              : null
          };
        }

        // 2. Tarjetas
        if (res.tarjetas && res.tarjetas.tarjetas && Array.isArray(res.tarjetas.tarjetas)) {
          this.tarjetas = res.tarjetas.tarjetas.map((t: ResumenTarjetaDashboard) => ({
            tarjetaId: t.tarjetaId,
            id: t.tarjetaId,
            nombreTarjeta: t.nombreTarjeta,
            ultimos4: t.ultimos4,
            banco: t.banco,
            limiteTotal: t.limiteTotal,
            gastosEsteMes: t.gastosEsteMes,
            gastosFuturos: t.gastosFuturos,
            limiteDisponible: t.limiteDisponible,
            porcentajeUso: t.porcentajeUso,
            color: '#2a2a2a'
          }));
        }

        // 3. Gastos
        if (res.gastos && Array.isArray(res.gastos)) {
          this.gastos = res.gastos.map((g: GastoDashboardItem) => ({
            id: g.id,
            fecha: g.fecha,
            descripcion: g.descripcion,
            monto: g.monto,
            moneda: g.moneda,
            categoria: {
              id: g.categoria.id,
              nombre: g.categoria.nombre,
              color_hex: g.categoria.color_hex || '#ccc',
              icono: g.categoria.icono || 'cash'
            },
            tarjeta: {
              id: g.tarjeta.id,
              nombre: g.tarjeta.nombre,
              banco: { id: g.tarjeta.banco.id, nombre: g.tarjeta.banco.nombre }
            },
            totalCuotas: g.totalCuotas,
            cuotaActual: g.cuotaActual,
            esDebitoAuto: g.esDebitoAuto
          }));
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error fatal cargando dashboard:', err);
        this.loading = false;
      }
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
