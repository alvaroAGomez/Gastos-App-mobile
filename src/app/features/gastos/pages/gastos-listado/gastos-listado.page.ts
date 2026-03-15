import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { GastoListadoItem, GastoListadoFiltro, GastosListadoResponse } from '../../models/gasto.model';
import { GastosService } from '../../services/gastos.service';
import { TarjetasCreditoService } from '../../../tarjetas/services/tarjetas-credito.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { TarjetaCredito } from '../../../tarjetas/models/tarjeta.model';
import { Categoria } from '../../../categorias/models/categoria.model';

export interface GastoGroup {
  label: string;   // 'Hoy', 'Ayer', 'lun 10 feb', etc.
  gastos: GastoListadoItem[];
}

@Component({
  selector: 'app-gastos-listado',
  templateUrl: './gastos-listado.page.html',
  styleUrls: ['./gastos-listado.page.scss'],
  standalone: false,
})
export class GastosListadoPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  // ── State ────────────────────────────────────────────────────
  loading = true;
  gastoGroups: GastoGroup[] = [];
  currentPage = 1;
  totalPages = 1;
  readonly PAGE_SIZE = 20;

  // ── Filters ──────────────────────────────────────────────────
  filtros: GastoListadoFiltro = {
    orderBy: 'fecha',
    orderDirection: 'DESC',
    limit: this.PAGE_SIZE,
    page: 1,
  };

  // Fecha filter state
  showFechaModal = false;
  fechaDesde: string = '';
  fechaHasta: string = '';
  get hoy(): string { return new Date().toISOString(); }

  // Date range selection state
  highlightedDates: any[] = [];
  selectionState: 'start' | 'end' = 'start';

  get calendarValue(): string {
    return this.selectionState === 'start' ? this.fechaDesde || this.hoy : this.fechaHasta || this.hoy;
  }

  setCalendarValue(event: any) {
    const selectedDate = event.detail.value;
    if (!selectedDate) return;

    if (this.selectionState === 'start') {
      this.fechaDesde = selectedDate;
      this.fechaHasta = ''; // reset end when start changes
      this.selectionState = 'end';
      this.updateHighlights(selectedDate, '');
    } else {
      // If end is before start, swap them or just treat as new start
      if (selectedDate < this.fechaDesde) {
        this.fechaDesde = selectedDate;
        this.fechaHasta = '';
        this.selectionState = 'end';
        this.updateHighlights(selectedDate, '');
      } else {
        this.fechaHasta = selectedDate;
        this.selectionState = 'start'; // Ready for new range if they click again
        this.updateHighlights(this.fechaDesde, selectedDate);
      }
    }
  }

  private updateHighlights(start: string, end: string) {
    if (!start) {
      this.highlightedDates = [];
      return;
    }

    const highlights = [];
    const startDate = new Date(start.split('T')[0] + 'T00:00:00');
    
    if (!end) {
      // Single date highlighted
      highlights.push({
        date: start.split('T')[0],
        textColor: '#fff',
        backgroundColor: 'var(--ion-color-primary)'
      });
    } else {
      // Range highlighted
      const endDate = new Date(end.split('T')[0] + 'T00:00:00');
      let current = new Date(startDate);

      while (current <= endDate) {
        const dateStr = current.toISOString().split('T')[0];
        const isEdge = dateStr === start.split('T')[0] || dateStr === end.split('T')[0];
        
        highlights.push({
          date: dateStr,
          textColor: '#fff',
          backgroundColor: isEdge ? 'var(--ion-color-primary)' : 'rgba(var(--ion-color-primary-rgb), 0.3)'
        });
        current.setDate(current.getDate() + 1);
      }
    }
    this.highlightedDates = highlights;
  }

  // Active filter chips
  activeDateFilter: string | null = null;
  activeTarjetaFilter: TarjetaCredito | null = null;
  activeCategoriaFilter: Categoria | null = null;

  // Filter sheets visibility
  showTarjetaSheet = false;
  showCategoriaSheet = false;


  // ── Mock data (Development Fallback) ──────────────────────────
  private readonly MOCK_TARJETAS: TarjetaCredito[] = [
    {
      id: 1, nombreTarjeta: 'Visa Signature', numeroTarjeta: '**** **** **** 1234',
      limiteCredito: 1500000, limiteDisponible: 980000, gastoActual: 520000,
      diaCierre: 25, diaVencimiento: 10,
      cierreActual: '2026-02-25T00:00:00.000Z', vencimientoActual: '2026-03-10T00:00:00.000Z',
      banco: { id: 2, nombre: 'Banco Galicia' }
    },
    {
      id: 2, nombreTarjeta: 'Mastercard Black', numeroTarjeta: '**** **** **** 5678',
      limiteCredito: 1000000, limiteDisponible: 660000, gastoActual: 340000,
      diaCierre: 20, diaVencimiento: 5,
      cierreActual: '2026-02-20T00:00:00.000Z', vencimientoActual: '2026-03-05T00:00:00.000Z',
      banco: { id: 1, nombre: 'BBVA' }
    }
  ];

  private readonly MOCK_CATEGORIAS: Categoria[] = [
    { id: 1,  nombre: 'Hogar',           es_global: true, color_hex: '#6366f1', icono: 'home' },
    { id: 2,  nombre: 'Supermercado',    es_global: true, color_hex: '#10b981', icono: 'cart' },
    { id: 3,  nombre: 'Transporte',      es_global: true, color_hex: '#f97316', icono: 'car' },
    { id: 4,  nombre: 'Comida',          es_global: true, color_hex: '#ef4444', icono: 'restaurant' },
    { id: 5,  nombre: 'Entretenimiento', es_global: true, color_hex: '#a855f7', icono: 'film' },
    { id: 12, nombre: 'Servicios',       es_global: true, color_hex: '#64748b', icono: 'receipt' },
  ];

  private readonly MOCK_GASTOS: GastoListadoItem[] = [
    {
      id: 45, gastoId: 12, fecha: new Date().toISOString().split('T')[0],
      descripcion: 'Netflix', categoria: { id: 5, nombre: 'Entretenimiento', color_hex: '#a855f7', icono: 'film' },
      monto: 3299, moneda: 'ARS',
      tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
      tipo: 'Crédito', esDebitoAuto: true
    },
    {
      id: 46, gastoId: 13, fecha: new Date().toISOString().split('T')[0],
      descripcion: 'Carpintería', categoria: { id: 12, nombre: 'Servicios', color_hex: '#64748b', icono: 'receipt' },
      monto: 200000, moneda: 'ARS',
      tarjeta: { id: 2, nombre: 'Mastercard Black', banco: 'BBVA' },
      tipo: 'Crédito', totalCuotas: 12, cuotaActual: 3, esDebitoAuto: false
    },
    {
      id: 47, gastoId: 14, fecha: new Date().toISOString().split('T')[0],
      descripcion: 'Starbucks', categoria: { id: 4, nombre: 'Comida', color_hex: '#ef4444', icono: 'restaurant' },
      monto: 5500, moneda: 'ARS',
      tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
      tipo: 'Crédito', esDebitoAuto: false
    },
    {
      id: 48, gastoId: 15,
      fecha: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      descripcion: 'Supermercado Carrefour', categoria: { id: 2, nombre: 'Supermercado', color_hex: '#10b981', icono: 'cart' },
      monto: 84200, moneda: 'ARS',
      tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
      tipo: 'Crédito', esDebitoAuto: false
    }
  ];


  tarjetas: TarjetaCredito[] = [...this.MOCK_TARJETAS];
  categorias: Categoria[] = [...this.MOCK_CATEGORIAS];

  constructor(
    private gastosService: GastosService,
    private tarjetasService: TarjetasCreditoService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit() {
    this.loadFilters();
    this.loadGastos(true);
  }

  // ── Data loading ─────────────────────────────────────────────
  private loadFilters() {
    this.tarjetasService.getAll().subscribe({
      next: (ts: TarjetaCredito[]) => {
        if (ts && ts.length > 0) {
          this.tarjetas = ts;
        }
      },
      error: () => console.log('Using mock cards')
    });

    this.categoriasService.getAll().subscribe({
      next: (cs: Categoria[]) => {
        if (cs && cs.length > 0) {
          this.categorias = cs;
        }
      },
      error: () => console.log('Using mock categories')
    });
  }

  loadGastos(reset = false) {
    if (reset) {
      this.currentPage = 1;
      this.gastoGroups = [];
      this.loading = true;
    }

    this.gastosService.getGastosPaginados(this.filtros).subscribe({
      next: (res: GastosListadoResponse) => {
        // Fallback to mock if API returns nothing in dev
        const finalGastos = (res.gastos && res.gastos.length > 0) ? res.gastos : this.applyMockFilters(this.MOCK_GASTOS);
        const groups = this.groupByDate(finalGastos);

        if (reset) {
          this.gastoGroups = groups;
        } else {
          this.mergeGroups(groups);
        }

        this.totalPages = res.pagination?.totalPages || 1;
        this.loading = false;
      },
      error: () => {
        console.log('Using mock expenses');
        const groups = this.groupByDate(this.applyMockFilters(this.MOCK_GASTOS));
        this.gastoGroups = groups;
        this.totalPages = 1;
        this.loading = false;
      }
    });
  }


  loadMore(event: any) {
    if (this.currentPage >= this.totalPages) {
      event.target.complete();
      event.target.disabled = true;
      return;
    }
    this.currentPage++;
    this.filtros.page = this.currentPage;

    this.gastosService.getGastosPaginados(this.filtros).subscribe({
      next: (res: GastosListadoResponse) => {
        const groups = this.groupByDate(res.gastos);
        this.mergeGroups(groups);
        this.totalPages = res.pagination.totalPages;

        event.target.complete();
        if (this.currentPage >= this.totalPages) event.target.disabled = true;
      },
      error: () => event.target.complete()
    });
  }



  // ── Grouping ─────────────────────────────────────────────────
  private groupByDate(gastos: GastoListadoItem[]): GastoGroup[] {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const map = new Map<string, GastoListadoItem[]>();

    for (const g of gastos) {
      if (!map.has(g.fecha)) map.set(g.fecha, []);
      map.get(g.fecha)!.push(g);
    }

    return Array.from(map.entries()).map(([fecha, items]) => ({
      label: fecha === today ? 'Hoy' : fecha === yesterday ? 'Ayer'
        : new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' }),
      gastos: items,
    }));
  }

  private mergeGroups(incoming: GastoGroup[]) {
    for (const group of incoming) {
      const existing = this.gastoGroups.find(g => g.label === group.label);
      if (existing) existing.gastos.push(...group.gastos);
      else this.gastoGroups.push(group);
    }
  }

  private applyMockFilters(gastos: GastoListadoItem[]): GastoListadoItem[] {
    return gastos.filter(g => {
      if (this.activeTarjetaFilter && g.tarjeta.id !== this.activeTarjetaFilter.id) return false;
      if (this.activeCategoriaFilter && g.categoria.id !== this.activeCategoriaFilter.id) return false;
      return true;
    });
  }

  // ── Filter methods ───────────────────────────────────────────
  selectTarjeta(t: TarjetaCredito) {
    this.activeTarjetaFilter = t;
    this.filtros.tarjetaId = t.id;
    this.showTarjetaSheet = false;
    this.reload();
  }

  selectCategoria(c: Categoria) {
    this.activeCategoriaFilter = c;
    this.filtros.categoriaId = c.id;
    this.showCategoriaSheet = false;
    this.reload();
  }

  applyFechaFilter() {
    if (this.fechaDesde) this.filtros.fechaDesde = this.fechaDesde.split('T')[0];
    if (this.fechaHasta) this.filtros.fechaHasta = this.fechaHasta.split('T')[0];
    if (this.fechaDesde || this.fechaHasta) {
      const desde = this.fechaDesde ? new Date(this.fechaDesde).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }) : '';
      const hasta = this.fechaHasta ? new Date(this.fechaHasta).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' }) : '';
      this.activeDateFilter = [desde, hasta].filter(Boolean).join(' – ');
    }
    this.showFechaModal = false;
    this.reload();
  }

  clearTarjeta() { this.activeTarjetaFilter = null; delete this.filtros.tarjetaId; this.reload(); }
  clearCategoria() { this.activeCategoriaFilter = null; delete this.filtros.categoriaId; this.reload(); }
  clearFecha() {
    this.activeDateFilter = null;
    this.fechaDesde = '';
    this.fechaHasta = '';
    delete this.filtros.fechaDesde;
    delete this.filtros.fechaHasta;
    this.reload();
  }

  clearAll() { this.clearTarjeta(); this.clearCategoria(); this.clearFecha(); }

  get hasActiveFilters(): boolean {
    return !!(this.activeTarjetaFilter || this.activeCategoriaFilter || this.activeDateFilter);
  }

  private reload() {
    if (this.infiniteScroll) this.infiniteScroll.disabled = false;
    this.loadGastos(true);
  }

  // ── Helpers ────────────────────────────────────────────────
  get totalGastos(): number {
    return this.gastoGroups.reduce((sum, g) => sum + g.gastos.length, 0);
  }

  buildGastoForComponent(item: GastoListadoItem): any {
    // Adapt GastoListadoItem to the GastoDashboard shape expected by <app-transaction-item>
    return {
      id: item.id,
      fecha: item.fecha,
      descripcion: item.descripcion,
      monto: item.monto,
      moneda: item.moneda,
      categoria: item.categoria,
      tarjeta: { id: item.tarjeta.id, nombre: item.tarjeta.nombre, banco: { id: 0, nombre: item.tarjeta.banco } },
      totalCuotas: item.totalCuotas,
      cuotaActual: item.cuotaActual,
      esDebitoAuto: item.esDebitoAuto
    };
  }
}
