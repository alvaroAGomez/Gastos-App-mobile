import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { TarjetaFormItem, CategoriaFormItem, CreateGastoRequest } from '../../models/gasto.model';

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
  moneda: string = 'ARS';

  get cuotas(): number {
    const v = parseInt(this.cuotasTexto);
    if (isNaN(v) || v < 1) return 1;
    if (v > 100) return 100;
    return v;
  }

  get hoy(): string { return new Date().toISOString(); }

  selectedTarjetaId: number | null = null;
  selectedCategoria: CategoriaFormItem | null = null;
  categoriaSearch: string = '';

  tarjetas: TarjetaFormItem[] = [
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

  categorias: CategoriaFormItem[] = [
    { id: 1,  nombre: 'Hogar',           es_global: true, color_hex: '#6366f1', icono: 'home' },
    { id: 2,  nombre: 'Supermercado',    es_global: true, color_hex: '#10b981', icono: 'cart' },
    { id: 3,  nombre: 'Transporte',      es_global: true, color_hex: '#f97316', icono: 'car' },
    { id: 4,  nombre: 'Comida',          es_global: true, color_hex: '#ef4444', icono: 'restaurant' },
    { id: 5,  nombre: 'Entretenimiento', es_global: true, color_hex: '#a855f7', icono: 'film' },
    { id: 6,  nombre: 'Salud',           es_global: true, color_hex: '#06b6d4', icono: 'medkit' },
    { id: 7,  nombre: 'Educación',       es_global: true, color_hex: '#3b82f6', icono: 'school' },
    { id: 8,  nombre: 'Mascotas',        es_global: true, color_hex: '#f59e0b', icono: 'paw' },
    { id: 9,  nombre: 'Viajes',          es_global: true, color_hex: '#14b8a6', icono: 'airplane' },
    { id: 10, nombre: 'Gym',             es_global: true, color_hex: '#ec4899', icono: 'barbell' },
    { id: 11, nombre: 'Compras',         es_global: true, color_hex: '#e879f9', icono: 'bag-handle' },
    { id: 12, nombre: 'Servicios',       es_global: true, color_hex: '#64748b', icono: 'receipt' },
    { id: 13, nombre: 'Suscripciones',   es_global: true, color_hex: '#9c27b0', icono: 'musical-notes' },
    { id: 14, nombre: 'Indumentaria',    es_global: true, color_hex: '#FF9800', icono: 'shirt' },
  ];

  get categoriasFiltradas(): CategoriaFormItem[] {
    if (!this.categoriaSearch.trim()) return this.categorias;
    return this.categorias.filter(c =>
      c.nombre.toLowerCase().includes(this.categoriaSearch.toLowerCase())
    );
  }

  get cuotasMensual(): number {
    if (!this.montoNumero || !this.cuotas) return 0;
    return this.montoNumero / this.cuotas;
  }

  get tarjetaSeleccionada(): TarjetaFormItem | undefined {
    return this.tarjetas.find(t => t.id === this.selectedTarjetaId);
  }

  get fechaDisplay(): string {
    const hoy = new Date().toISOString().split('T')[0];
    const selected = this.fechaCompra.split('T')[0];
    if (selected === hoy) return 'Hoy';
    return new Date(this.fechaCompra).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { this.isEditMode = true; this.gastoId = +id; }
    if (this.tarjetas.length > 0) this.selectedTarjetaId = this.tarjetas[0].id;
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
  selectCategoria(cat: CategoriaFormItem) {
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

  buildPayload(): CreateGastoRequest {
    return {
      usuarioId: 1,
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

  guardarGasto() {
    if (!this.montoNumero || !this.selectedTarjetaId || !this.selectedCategoria || !this.descripcion) return;
    console.log('Guardar gasto:', this.buildPayload());
    this.router.navigate(['/app/gastos']);
  }

  cancelar() { this.router.navigate(['/app']); }
}
