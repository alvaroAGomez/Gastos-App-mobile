export interface DashboardSummary {
  totalDisponible: number;
  gastosEsteMes: number;
  proximoCierre: string | null;
}

export interface Banco {
  id: number;
  nombre: string;
}

export interface Categoria {
  id: number;
  nombre: string;
  color_hex: string;
  icono: string;
}

export interface TarjetaDashboard {
  tarjetaId: number;
  nombreTarjeta: string;
  ultimos4: string;
  banco: string;
  limiteTotal: number;
  gastosEsteMes: number;
  gastosFuturos: number;
  limiteDisponible: number;
  porcentajeUso: number;
  fechaCierre?: string;
}

export interface TarjetaSimple {
  id: number;
  nombre: string;
  banco: Banco;
}

export interface GastoDashboard {
  id: number;
  fecha: string;
  descripcion: string;
  monto: number;
  moneda: string;
  categoria: Categoria;
  tarjeta: TarjetaSimple;
  totalCuotas?: number;
  cuotaActual?: number;
  esDebitoAuto: boolean;
}

export interface DashboardGastosResponse {
  gastos: GastoDashboard[];
  periodo: {
    desde: string;
    hasta: string;
    esFiltroPorDefecto: boolean;
  };
}
