import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReporteCuotasPendientes } from '../../models/tarjeta.model';

@Component({
  selector: 'app-tarjeta-cuotas-pendientes',
  templateUrl: './tarjeta-cuotas-pendientes.page.html',
  styleUrls: ['./tarjeta-cuotas-pendientes.page.scss'],
  standalone: false,
})
export class TarjetaCuotasPendientesPage implements OnInit {
  tarjetaId: number | null = null;
  loading = true;
  reporte: ReporteCuotasPendientes | null = null;

  // Mock data based on user input
  private readonly MOCK_REPORT: ReporteCuotasPendientes = {
    "cuotasPendientes": [
      {
        "gastoId": 12,
        "nombreGasto": "Televisor Samsung 55\"",
        "categoria": {
          "id": 4,
          "nombre": "Electrónica",
          "color_hex": "#ef4444",
          "icono": "tv"
        },
        "montoTotal": 720000,
        "moneda": "ARS",
        "cuotaActual": 2,
        "totalCuotas": 12,
        "cuotasFaltantes": 10,
        "montoCuota": 60000,
        "proximaCuotaFecha": "2026-03-25"
      },
      {
        "gastoId": 25,
        "nombreGasto": "Notebook Lenovo ThinkPad",
        "categoria": {
          "id": 4,
          "nombre": "Electrónica",
          "color_hex": "#3b82f6",
          "icono": "laptop"
        },
        "montoTotal": 960000,
        "moneda": "ARS",
        "cuotaActual": 5,
        "totalCuotas": 18,
        "cuotasFaltantes": 13,
        "montoCuota": 53333.33,
        "proximaCuotaFecha": "2026-03-10"
      },
      {
        "gastoId": 40,
        "nombreGasto": "Zapatillas Nike",
        "categoria": {
          "id": 5,
          "nombre": "Indumentaria",
          "color_hex": "#f59e0b",
          "icono": "shirt"
        },
        "montoTotal": 180000,
        "moneda": "ARS",
        "cuotaActual": 1,
        "totalCuotas": 6,
        "cuotasFaltantes": 5,
        "montoCuota": 30000,
        "proximaCuotaFecha": "2026-03-05"
      }
    ],
    "totalPendiente": 1683333.33,
    "totalGastosConCuotasPendientes": 3,
    "pagadoEsteMes": 143333.33,
    "cuotasRestantesTotales": 28,
    "proximoVencimiento": "10 Mar"
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tarjetaId = +id;
      this.loadReporte();
    }
  }

  loadReporte() {
    this.loading = true;
    setTimeout(() => {
      this.reporte = this.MOCK_REPORT;
      this.loading = false;
    }, 600);
  }

  getSaldoRestante(c: any): number {
    return c.montoCuota * c.cuotasFaltantes;
  }
}
