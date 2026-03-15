import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TarjetasCreditoService } from '../../tarjetas/services/tarjetas-credito.service';
import { ReporteCuotasPendientes, CuotaPendiente } from '../../tarjetas/models/tarjeta.model';

/**
 * CuotasService
 * Las cuotas se gestionan a través de TarjetasCredito en el backend.
 * Endpoints reales:
 *   - GET /tarjetas-credito/:id/cuotas-pendientes
 *   - GET /tarjetas-credito/:id/proyeccion-12-meses
 */
@Injectable({
  providedIn: 'root'
})
export class CuotasService {
  constructor(private tarjetasService: TarjetasCreditoService) {}

  /**
   * Obtiene las cuotas pendientes de una tarjeta específica.
   * GET /tarjetas-credito/:tarjetaId/cuotas-pendientes
   */
  getCuotasPendientesByTarjeta(tarjetaId: number): Observable<ReporteCuotasPendientes> {
    return this.tarjetasService.getCuotasPendientes(tarjetaId);
  }

  /**
   * Placeholder para obtener todas las cuotas pendientes (para cumplir con la UI actual).
   */
  getCuotasPendientes(): Observable<any[]> {
    return of([]);
  }

  /**
   * Placeholder para obtener resumen anual (para cumplir con la UI actual).
   */
  getResumenAnual(anio: number): Observable<any> {
    return of(null);
  }

  // Los siguientes endpoints no existen en el backend actual (pendiente):
  // marcarPagada(id: number): Observable<void> { ... }
  // getResumenMensual(anio: number, mes: number): Observable<ResumenMensualCuotas> { ... }
  // getResumenAnual(anio: number): Observable<ResumenAnualCuotas> { ... }
}
