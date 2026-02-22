import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Proyeccion12Meses } from '../../models/tarjeta.model';

@Component({
  selector: 'app-tarjeta-credito-proyeccion',
  templateUrl: './tarjeta-credito-proyeccion.page.html',
  styleUrls: ['./tarjeta-credito-proyeccion.page.scss'],
  standalone: false,
})
export class TarjetaCreditoProyeccionPage implements OnInit {
  tarjetaId: number | null = null;
  loading = true;
  proyeccion: Proyeccion12Meses | null = null;

  // Mock data as provided by user
  private readonly MOCK_PROYECCION: Proyeccion12Meses = {
    "gastosPorMes": [
      { "mes": "2026-03", "nombreMes": "Marzo", "total": 820000 },
      { "mes": "2026-04", "nombreMes": "Abril", "total": 760000 },
      { "mes": "2026-05", "nombreMes": "Mayo", "total": 910000 },
      { "mes": "2026-06", "nombreMes": "Junio", "total": 880000 },
      { "mes": "2026-07", "nombreMes": "Julio", "total": 790000 },
      { "mes": "2026-08", "nombreMes": "Agosto", "total": 845000 },
      { "mes": "2026-09", "nombreMes": "Septiembre", "total": 870000 },
      { "mes": "2026-10", "nombreMes": "Octubre", "total": 920000 },
      { "mes": "2026-11", "nombreMes": "Noviembre", "total": 780000 },
      { "mes": "2026-12", "nombreMes": "Diciembre", "total": 950000 },
      { "mes": "2027-01", "nombreMes": "Enero", "total": 700000 },
      { "mes": "2027-02", "nombreMes": "Febrero", "total": 830000 }
    ],
    "totalProyectado12Meses": 10055000,
    "promedioMensual": 837916.67,
    "mesConMayorGasto": { "mes": "2026-12", "nombreMes": "Diciembre", "total": 950000 },
    "mesConMenorGasto": { "mes": "2027-01", "nombreMes": "Enero", "total": 700000 }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tarjetaId = +id;
      this.loadProyeccion();
    }
  }

  loadProyeccion() {
    this.loading = true;
    // Simulate API call
    setTimeout(() => {
      this.proyeccion = this.MOCK_PROYECCION;
      this.loading = false;
    }, 600);
  }

  getPercentOfMax(amount: number): number {
    if (!this.proyeccion) return 0;
    return (amount / this.proyeccion.mesConMayorGasto.total) * 100;
  }

  getYearFromMes(mesStr: string): string {
    return mesStr.split('-')[0];
  }
}
