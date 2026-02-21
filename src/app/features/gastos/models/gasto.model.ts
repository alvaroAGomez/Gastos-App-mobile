export interface Gasto {
  id: number;
  monto: number;
  descripcion: string;
  fecha: string;
  tarjetaId?: number;
  tarjetaNombre?: string;
  categoriaId: number;
  categoriaNombre: string;
  cuotas: number;
  cuotaActual: number;
}

export interface CreateGastoRequest {
  usuarioId: number;
  tarjetaId: number;
  categoriaId: number;
  descripcion: string;
  monto: number;
  moneda: string;
  fechaCompra: string;
  tipo: 1 | 2 | 3;
  cuotas?: number; // Solo para tipo 2
}

export interface TarjetaFormItem {
  id: number;
  nombreTarjeta: string;
  numeroTarjeta: string;
  limiteCredito: number;
  limiteDisponible: number;
  gastoActual: number;
  diaCierre: number;
  diaVencimiento: number;
  cierreActual: string;
  vencimientoActual: string;
  banco: { id: number; nombre: string };
}

export interface CategoriaFormItem {
  id: number;
  nombre: string;
  es_global: boolean;
  color_hex: string;
  icono: string;
}

export interface CreateCategoriaRequest {
  nombre: string;
  es_global: boolean;
  color_hex: string;
  icono: string;
}

export interface UpdateGastoDto extends Partial<CreateGastoRequest> {}

export interface GastosFiltro {
  page: number;
  size: number;
  tarjetaId?: number;
  categoriaId?: number;
  desde?: string;
  hasta?: string;
}

// ── Gastos Listado API ────────────────────────────────────────────────────

export interface GastoListadoFiltro {
  tarjetaId?: number;
  categoriaId?: number;
  mes?: string;         // 'YYYY-MM'
  fechaDesde?: string;  // 'YYYY-MM-DD'
  fechaHasta?: string;  // 'YYYY-MM-DD'
  page?: number;
  limit?: number;
  orderBy?: 'fecha' | 'monto' | 'descripcion';
  orderDirection?: 'ASC' | 'DESC';
}

export interface GastoListadoItem {
  id: number;
  gastoId: number;
  fecha: string;
  descripcion: string;
  categoria: {
    id: number;
    nombre: string;
    color_hex: string;
    icono: string;
  };
  monto: number;
  montoTotal?: number;
  moneda: string;
  tarjeta: {
    id: number;
    nombre: string;
    banco: string;
  };
  tipo: string;
  totalCuotas?: number;
  cuotaActual?: number;
  esDebitoAuto: boolean;
}

export interface GastosListadoResponse {
  gastos: GastoListadoItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filtros?: Record<string, any>;
}
