import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { CreateGastoRequest } from '../../models/gasto.model';
import { TarjetasCreditoService } from '../../../tarjetas/services/tarjetas-credito.service';
import { CategoriasService } from '../../../categorias/services/categorias.service';
import { GastosService } from '../../services/gastos.service';
import { AuthService } from '../../../../core/services/auth.service';
import { TarjetaCredito } from '../../../tarjetas/models/tarjeta.model';
import { Categoria } from '../../../categorias/models/categoria.model';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.page.html',
  styleUrls: ['./gasto-form.page.scss'],
  standalone: false,
})
export class GastoFormPage implements OnInit {
  @ViewChild('categoriaModal') categoriaModal!: IonModal;
  @ViewChild('fechaModal') fechaModal!: IonModal;

  isEditMode = false;
  gastoId: number | null = null;
  loading = false;
  saving = false;

  // Monto: stored as display string, formatted with thousands dots and decimal comma
  montoDisplay: string = '';

  get montoNumero(): number {
    const clean = this.montoDisplay.replace(/\./g, '').replace(',', '.');
    return parseFloat(clean) || 0;
  }

  // Dynamic font size based on display length
  get montoFontSize(): string {
    const len = this.montoDisplay.length;
    if (len <= 4)  return '64px';
    if (len <= 7)  return '52px';
    if (len <= 10) return '40px';
    return '32px';
  }

  // Form fields
  descripcion: string = '';
  fechaCompra: string = new Date().toISOString();
  tipo: 1 | 2 | 3 = 1;
  cuotasTexto: string = '3';
  moneda: 'ARS' | 'USD' = 'ARS';

  get cuotas(): number {
    const v = parseInt(this.cuotasTexto);
    if (isNaN(v) || v < 1) return 1;
    if (v > 100) return 100;
    return v;
  }

  get hoy(): string { return new Date().toISOString(); }

  selectedTarjetaId: number | null = null;
  selectedCategoria: Categoria | null = null;
  categoriaSearch: string = '';
  pendingCategoria: Categoria | null = null;

  tarjetas: TarjetaCredito[] = [];
  categorias: Categoria[] = [];

  get categoriasFiltradas(): Categoria[] {
    if (!this.categoriaSearch.trim()) return this.categorias;
    return this.categorias.filter(c =>
      c.nombre.toLowerCase().includes(this.categoriaSearch.toLowerCase())
    );
  }

  get categoriasQuick(): Categoria[] {
    if (!this.selectedCategoria) return this.categorias.slice(0, 5);
    const others = this.categorias.filter(c => c.id !== this.selectedCategoria!.id);
    return [this.selectedCategoria, ...others].slice(0, 5);
  }

  get cuotasMensual(): number {
    if (!this.montoNumero || !this.cuotas) return 0;
    return this.montoNumero / this.cuotas;
  }

  get tarjetaSeleccionada(): TarjetaCredito | undefined {
    return this.tarjetas.find(t => t.id === this.selectedTarjetaId);
  }

  get fechaDisplay(): string {
    const hoy = new Date().toISOString().split('T')[0];
    const selected = this.fechaCompra.split('T')[0];
    if (selected === hoy) return 'Hoy';
    return new Date(this.fechaCompra).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
  }

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private tarjetasService: TarjetasCreditoService,
    private categoriasService: CategoriasService,
    private gastosService: GastosService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.gastoId = +id;
    }
  }

  ionViewWillEnter() {
    const navState = history.state;
    const nuevaCategoria: Categoria | null = navState?.nuevaCategoria ?? null;

    this.resetForm();

    if (nuevaCategoria) {
      this.pendingCategoria = nuevaCategoria;
    }

    this.loadInitialData();
  }

  private resetForm() {
    this.montoDisplay = '';
    this.descripcion = '';
    this.fechaCompra = new Date().toISOString();
    this.tipo = 1;
    this.cuotasTexto = '3';
    this.selectedCategoria = null;
    this.selectedTarjetaId = null;
    this.categoriaSearch = '';
    this.pendingCategoria = null;
  }

  loadInitialData() {
    this.loading = true;
    forkJoin({
      tarjetas: this.tarjetasService.getAll().pipe(catchError(() => of([]))),
      categorias: this.categoriasService.getAll().pipe(catchError(() => of([])))
    }).subscribe({
      next: (res: any) => {
        this.tarjetas = res.tarjetas || [];
        this.categorias = (res.categorias || []).sort((a: Categoria, b: Categoria) =>
          a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));

        if (this.tarjetas.length > 0 && !this.selectedTarjetaId) {
          this.selectedTarjetaId = this.tarjetas[0].id;
        }
        if (this.pendingCategoria) {
          const id = this.pendingCategoria.id;
          this.selectedCategoria = this.categorias.find(c => c.id === id) || this.pendingCategoria;
          this.pendingCategoria = null;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando datos iniciales:', err);
        this.loading = false;
      }
    });
  }

  // ── Monto formatting ─────────────────────────────────────────────────────
  onMontoInput(event: any) {
    let raw: string = event.target.value;

    // Allow only digits and at most one comma
    raw = raw.replace(/[^0-9,]/g, '');

    // Split at comma
    const parts = raw.split(',');
    let intPart = parts[0];
    const decPart = parts.length > 1 ? parts[1].substring(0, 2) : null;

    // Remove leading zeros and clamp integer to 7 digits
    intPart = intPart.replace(/^0+/, '').substring(0, 7) || '';

    // Add thousand separators (dots)
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Reconstruct
    this.montoDisplay = decPart !== null ? `${intPart},${decPart}` : intPart;

    // Update the DOM input to the formatted value
    event.target.value = this.montoDisplay;
  }

  // ── Cuotas ─────────────────────────────────────────────────────────────
  setTipo(t: 1 | 2 | 3) {
    this.tipo = t;
    if (t === 2) this.cuotasTexto = '3';
    else this.cuotasTexto = '1';
  }

  onCuotasInput(event: any) {
    let v = parseInt(event.target.value);
    if (isNaN(v) || v < 1) v = 1;
    if (v > 100) v = 100;
    this.cuotasTexto = v.toString();
    event.target.value = this.cuotasTexto;
  }

  // ── Category ────────────────────────────────────────────────────────────
  selectCategoria(cat: Categoria) {
    this.selectedCategoria = cat;
    this.categoriaModal.dismiss();
  }

  openCategoryModal() {
    this.categoriaSearch = '';
    this.categoriaModal.present();
  }

  goToNuevaCategoria() {
    this.categoriaModal.dismiss();
    this.router.navigate(['/app/categorias/nueva']);
  }

  onFechaChange(event: any) { this.fechaCompra = event.detail.value; }

  async buildPayload(): Promise<CreateGastoRequest> {
    const usuarioId = await this.authService.getUserId();

    return {
      usuarioId: usuarioId || 1,
      tarjetaId: this.selectedTarjetaId!,
      categoriaId: this.selectedCategoria!.id,
      descripcion: this.descripcion,
      monto: this.montoNumero,
      moneda: this.moneda,
      fechaCompra: this.fechaCompra.split('T')[0],
      tipo: this.tipo,
      ...(this.tipo === 2 ? { cuotas: this.cuotas } : {})
    };
  }
 
  async guardarGasto() {
    if (!this.montoNumero || !this.selectedTarjetaId || !this.selectedCategoria || !this.descripcion) return;
    
    this.saving = true;
    try {
      const payload = await this.buildPayload();
      this.gastosService.createGasto(payload).subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/app/gastos']);
        },
        error: (err) => {
          console.error('Error guardando gasto:', err);
          this.saving = false;
        }
      });
    } catch (err) {
      console.error('Error al construir payload:', err);
      this.saving = false;
    }
  }

  cancelar() { this.router.navigate(['/app']); }
}
