import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReportesFiltro } from '../../models/reportes-filtro.model';

@Component({
  selector: 'app-filtros-reportes',
  templateUrl: './filtros-reportes.component.html',
  styleUrls: ['./filtros-reportes.component.scss'],
  standalone: false,
})
export class FiltrosReportesComponent implements OnInit {
  @Input() showAnio: boolean = false;
  @Input() showMes: boolean = false;
  @Input() showRangoFechas: boolean = false;
  @Input() showTarjeta: boolean = false;
  @Input() showCategoria: boolean = false;
  @Input() showAgrupacion: boolean = false;

  @Output() filtrosChange = new EventEmitter<ReportesFiltro>();

  filtros: ReportesFiltro = {};

  anios: number[] = [];
  meses = [
    { value: 1, label: 'Enero' },
    { value: 2, label: 'Febrero' },
    { value: 3, label: 'Marzo' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Mayo' },
    { value: 6, label: 'Junio' },
    { value: 7, label: 'Julio' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Septiembre' },
    { value: 10, label: 'Octubre' },
    { value: 11, label: 'Noviembre' },
    { value: 12, label: 'Diciembre' }
  ];

  // Placeholder - estas listas se cargarían desde servicios reales
  tarjetas: any[] = [];
  categorias: any[] = [];

  ngOnInit() {
    // Generar años (últimos 5 años)
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      this.anios.push(currentYear - i);
    }
    this.filtros.anio = currentYear;
  }

  onFiltroChange() {
    this.filtrosChange.emit(this.filtros);
  }

  limpiarFiltros() {
    this.filtros = { anio: new Date().getFullYear() };
    this.filtrosChange.emit(this.filtros);
  }
}
