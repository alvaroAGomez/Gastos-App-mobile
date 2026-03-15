// ── GET /dashboard/resumen-financiero ─────────────────────────────────────
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

// ── GET /dashboard/tarjetas ───────────────────────────────────────────────
// Devuelve un array de DetalleDashboardTarjeta (mismo que /tarjetas-credito/:id/detalle-dashboard)
// La respuesta de la API envuelve las tarjetas y añade totales
export interface DashboardTarjetasResponse {
  tarjetas: ResumenTarjetaDashboard[];
  totalLimiteDisponible: number;
  totalLimite: number;
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
