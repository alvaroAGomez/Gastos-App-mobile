export interface TarjetaCredito {
  id: number;
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  diaCierre: number;
  diaVencimiento: number;
  cupoTotal: number;
  cupoDisponible: number;
  color?: string;
  gastosMesActual?: number;
}

export interface TarjetaDebito {
  id: number;
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  saldo: number;
  color?: string;
}

export interface Banco {
  id: number;
  nombre: string;
  logo_url?: string;
}

export interface TarjetaCreditoRequest {
  bancoId: number;
  numeroTarjeta: string; 
  nombreTarjeta: string;
  limiteCredito: number;
  diaCierreDefault: number;
  diaVencimientoDefault: number;
  color?: string;
}

export interface CreateTarjetaDebitoDto {
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  saldoInicial: number;
  color?: string;
}
export interface MesProyeccion {
  mes: string;
  nombreMes: string;
  total: number;
}

export interface Proyeccion12Meses {
  gastosPorMes: MesProyeccion[];
  totalProyectado12Meses: number;
  promedioMensual: number;
  mesConMayorGasto: MesProyeccion;
  mesConMenorGasto: MesProyeccion;
}
export interface CuotaPendiente {
  gastoId: number;
  nombreGasto: string;
  categoria: {
    id: number;
    nombre: string;
    color_hex: string;
    icono: string;
  };
  montoTotal: number;
  moneda: string;
  cuotaActual: number;
  totalCuotas: number;
  cuotasFaltantes: number;
  montoCuota: number;
  proximaCuotaFecha: string;
}

export interface ReporteCuotasPendientes {
  cuotasPendientes: CuotaPendiente[];
  totalPendiente: number;
  totalGastosConCuotasPendientes: number;
  pagadoEsteMes?: number; // Added to match design
  cuotasRestantesTotales?: number; // Added to match design
  proximoVencimiento?: string; // Added to match design
}
