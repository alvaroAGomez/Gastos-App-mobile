export interface ProximoCierreDto {
  fecha: string;
  nombreTarjeta: string;
  tipo: 'cierre';
}

export interface ResumenFinancieroDto {
  totalDisponible: number;
  gastosEsteMes: number;
  proximoCierre: ProximoCierreDto | null;
}

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

export interface ResumenTarjetaDashboard {
  tarjetaId: number;
  nombreTarjeta: string;
  ultimos4: string;
  banco: string;
  limiteTotal: number;
  gastosEsteMes: number;
  gastosFuturos: number;
  limiteDisponible: number;
  porcentajeUso: number;
}

export interface DashboardTarjetasResponse {
  tarjetas: ResumenTarjetaDashboard[];
  totalLimiteDisponible: number;
  totalLimite: number;
}

export interface TarjetaDashboard extends ResumenTarjetaDashboard {
  id?: number; // Para compatibilidad
  color?: string; // Para UI personalizada
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
