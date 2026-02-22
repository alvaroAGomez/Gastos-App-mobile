import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FiltroReportesDto } from '../../../features/reportes/models/reportes.models';
import { TarjetasCreditoService } from '../../../features/tarjetas/services/tarjetas-credito.service';
import { CategoriasService } from '../../../features/categorias/services/categorias.service';
import { Banco } from '../../../features/tarjetas/models/tarjeta.model';
import { Categoria } from '../../../features/categorias/models/categoria.model';

@Component({
  selector: 'app-filtros-reportes',
  templateUrl: './filtros-reportes.component.html',
  styleUrls: ['./filtros-reportes.component.scss'],
  standalone: false,
})
export class FiltrosReportesComponent implements OnInit {
  @Input() filtros: FiltroReportesDto = {
    anio: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    tipoGasto: 1
  };

  @Output() filtrosChange = new EventEmitter<FiltroReportesDto>();
  @Output() close = new EventEmitter<void>();

  // Date range state
  selectionState: 'start' | 'end' = 'start';
  highlightedDates: any[] = [];
  get hoy(): string { return new Date().toISOString(); }
  
  get calendarValue(): string {
    return this.selectionState === 'start' ? this.filtros.fechaDesde || this.hoy : this.filtros.fechaHasta || this.hoy;
  }

  tarjetas: any[] = [];
  categorias: Categoria[] = [];

  private readonly MOCK_TARJETAS = [
    { id: 1, nombreTarjeta: 'Visa Platinum', color: '#3b82f6', ultimosDigitos: '1234' },
    { id: 2, nombreTarjeta: 'Mastercard Gold', color: '#f59e0b', ultimosDigitos: '5678' },
    { id: 3, nombreTarjeta: 'Nu Standard', color: '#8b5cf6', ultimosDigitos: '9012' }
  ];

  private readonly MOCK_CATEGORIAS: any[] = [
    { id: 1, nombre: 'Comida', icono: 'restaurant' },
    { id: 2, nombre: 'Transporte', icono: 'car' },
    { id: 3, nombre: 'Compras', icono: 'cart' },
    { id: 4, nombre: 'Salud', icono: 'medkit' },
    { id: 5, nombre: 'Vivienda', icono: 'home' },
    { id: 6, nombre: 'Otros', icono: 'ellipsis-horizontal' }
  ];

  constructor(
    private tcService: TarjetasCreditoService,
    private catService: CategoriasService
  ) {}

  ngOnInit() {
    this.loadInitialData();
    if (this.filtros.fechaDesde) {
      this.updateHighlights(this.filtros.fechaDesde, this.filtros.fechaHasta || '');
    }
  }

  loadInitialData() {
    this.tcService.getAll().subscribe({
      next: (data: any[]) => {
        if (data && data.length > 0) {
          this.tarjetas = data.map(t => ({
            ...t,
            nombreTarjeta: t.nombre,
            numeroCorto: t.ultimosDigitos || t.numeroTarjeta?.slice(-4) || '****'
          }));
        } else {
          this.tarjetas = this.MOCK_TARJETAS;
        }
      },
      error: () => this.tarjetas = this.MOCK_TARJETAS
    });

    this.catService.getCategoriasGlobales().subscribe({
      next: (data: Categoria[]) => {
        if (data && data.length > 0) {
          this.categorias = data;
        } else {
          this.categorias = this.MOCK_CATEGORIAS;
        }
      },
      error: () => this.categorias = this.MOCK_CATEGORIAS
    });
  }

  setCalendarValue(event: any) {
    const selectedDate = event.detail.value;
    if (!selectedDate) return;

    if (this.selectionState === 'start') {
      this.filtros.fechaDesde = selectedDate;
      this.filtros.fechaHasta = undefined;
      this.selectionState = 'end';
      this.updateHighlights(selectedDate, '');
    } else {
      if (selectedDate < (this.filtros.fechaDesde || '')) {
        this.filtros.fechaDesde = selectedDate;
        this.filtros.fechaHasta = undefined;
        this.selectionState = 'end';
        this.updateHighlights(selectedDate, '');
      } else {
        this.filtros.fechaHasta = selectedDate;
        this.selectionState = 'start';
        this.updateHighlights(this.filtros.fechaDesde || '', selectedDate);
      }
    }
  }

  private updateHighlights(start: string, end: string) {
    const highlights = [];
    const startDateStr = start.split('T')[0];
    const startDate = new Date(startDateStr + 'T00:00:00');
    
    if (!end) {
      highlights.push({ date: startDateStr, textColor: '#fff', backgroundColor: '#10b981' });
    } else {
      const endDateStr = end.split('T')[0];
      const endDate = new Date(endDateStr + 'T00:00:00');
      let current = new Date(startDate);

      while (current <= endDate) {
        const dateStr = current.toISOString().split('T')[0];
        const isEdge = dateStr === startDateStr || dateStr === endDateStr;
        highlights.push({
          date: dateStr,
          textColor: '#fff',
          backgroundColor: isEdge ? '#10b981' : 'rgba(16, 185, 129, 0.2)'
        });
        current.setDate(current.getDate() + 1);
      }
    }
    this.highlightedDates = highlights;
  }

  selectTarjeta(id?: number) {
    if (!id) {
      this.filtros.tarjetaIds = [];
      return;
    }
    if (!this.filtros.tarjetaIds) this.filtros.tarjetaIds = [];
    
    const index = this.filtros.tarjetaIds.indexOf(id);
    if (index > -1) {
      this.filtros.tarjetaIds.splice(index, 1);
    } else {
      this.filtros.tarjetaIds.push(id);
    }
  }

  selectCategoria(id?: number) {
    if (!id) {
      this.filtros.categoriaIds = [];
      return;
    }
    if (!this.filtros.categoriaIds) this.filtros.categoriaIds = [];

    const index = this.filtros.categoriaIds.indexOf(id);
    if (index > -1) {
      this.filtros.categoriaIds.splice(index, 1);
    } else {
      this.filtros.categoriaIds.push(id);
    }
  }

  selectTipoGasto(tipo: number) {
    this.filtros.tipoGasto = tipo;
  }

  aplicarFiltros() {
    this.filtrosChange.emit({ ...this.filtros });
    this.close.emit();
  }

  limpiarFiltros() {
    this.filtros = { anio: new Date().getFullYear(), mes: new Date().getMonth() + 1, tipoGasto: 1, tarjetaIds: [], categoriaIds: [] };
    this.highlightedDates = [];
    this.selectionState = 'start';
  }
}
