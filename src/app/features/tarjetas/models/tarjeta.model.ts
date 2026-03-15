// Responde al DTO real del backend: TarjetaCreditoResponseDto
export interface TarjetaCredito {
  id: number;
  nombre?: string;         // Backend Entity (optional for compat)
  nombreTarjeta: string;  // Backend DTO (sometimes used)
  numeroTarjeta: string;
  ultimos4Digitos?: string; // Backend Entity (optional for compat)
  limiteCredito: number;
  limite_total?: number;    // Backend Entity (optional for compat)
  limiteDisponible: number;
  gastoActual: number;
  diaCierre: number;
  dia_cierre_default?: number; // Backend Entity
  diaVencimiento: number;
  dia_vencimiento_default?: number; // Backend Entity
  cierreActual: string;
  vencimientoActual: string;
  color?: string;
  banco: {
    id: number;
    nombre: string;
    logo_url?: string;
  };
}

// Backend: UpdateTarjetaCreditoDto (PUT /tarjetas-credito/:id)
export interface TarjetaCreditoRequest {
  bancoId: number;
  numeroTarjeta: string;
  nombreTarjeta: string;
  limiteCredito: number;
  diaCierreDefault: number;
  diaVencimientoDefault: number;
  color?: string;
}

export interface Banco {
  id: number;
  nombre: string;
  logo_url?: string;
}

// ── Tarjeta Débito (pendiente de implementación en backend) ──────────────
export interface TarjetaDebito {
  id: number;
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  saldo: number;
  color?: string;
}

export interface CreateTarjetaDebitoDto {
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  saldoInicial: number;
  color?: string;
}

// ── Detalle Dashboard (/tarjetas-credito/:id/detalle-dashboard) ──────────
export interface DetalleDashboardTarjeta {
  id: number;
  nombreTarjeta: string;
  limiteCredito: number;
  limiteDisponible: number;
  gastoActual: number;
  diaCierre: number;
  diaVencimiento: number;
  cierreActual: string;
  vencimientoActual: string;
  banco: { id: number; nombre: string; logo_url?: string };
  gastosEsteMes: number;
  cuotasPendientesTotales: number;
  proximoCierre: string;
  [key: string]: any;
}

// ── Cuotas Pendientes (/tarjetas-credito/:id/cuotas-pendientes) ──────────
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
  pagadoEsteMes?: number;
  cuotasRestantesTotales?: number;
  proximoVencimiento?: string;
}

// ── Proyección 12 meses (/tarjetas-credito/:id/proyeccion-12-meses) ──────
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
