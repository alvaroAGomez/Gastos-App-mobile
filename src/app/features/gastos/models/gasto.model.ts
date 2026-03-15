// ── Entidad base ──────────────────────────────────────────────────────────
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

// ── CreateGastoRequest (POST /gastos) ─────────────────────────────────────
// Coincide con CreateGastoDto del backend
export interface CreateGastoRequest {
  usuarioId: number;
  tarjetaId: number;
  categoriaId?: number;
  descripcion?: string;
  monto: number;
  moneda: 'ARS' | 'USD';
  fechaCompra: string;
  /** 1=Normal, 2=Cuotas, 3=Débito automático */
  tipo: 1 | 2 | 3;
  cuotas?: number; // Solo para tipo=2
}

// ── UpdateGastoDto (pendiente de implementación en backend) ───────────────
// export interface UpdateGastoDto extends Partial<CreateGastoRequest> {}

// ── Filtros para GET /gastos ──────────────────────────────────────────────
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

// ── Item del listado completo (GET /gastos) ───────────────────────────────
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

// ── Dashboard de gastos (GET /gastos/dashboard) ───────────────────────────
export interface GastoDashboardFiltro {
  limit?: number;
  tarjetaId?: number;
  categoriaId?: number;
  fechaDesde?: string;
  fechaHasta?: string;
}

export interface GastoDashboardItem {
  id: number;
  fecha: string;
  descripcion: string;
  monto: number;
  moneda: string;
  categoria: {
    id: number;
    nombre: string;
    color_hex?: string;
    icono?: string;
  };
  tarjeta: {
    id: number;
    nombre: string;
    banco: {
      id: number;
      nombre: string;
    };
  };
  totalCuotas?: number;
  cuotaActual?: number;
  esDebitoAuto: boolean;
}

export interface GastossDashboardResponse {
  gastos: GastoDashboardItem[];
  periodo: {
    desde: string;
    hasta: string;
    esFiltroPorDefecto: boolean;
  };
}

