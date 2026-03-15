import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { ApiResponse } from '../../../core/models/api-response.model';
import {
  TarjetaCredito,
  TarjetaCreditoRequest,
  DetalleDashboardTarjeta,
  ReporteCuotasPendientes,
  Proyeccion12Meses,
} from '../models/tarjeta.model';
import { Banco } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetasCreditoService {
  constructor(private api: ApiService) {}

  /** GET /bancos - lista de bancos para el formulario */
  getBancos(): Observable<Banco[]> {
    return this.api.get<ApiResponse<Banco[]>>(ENDPOINTS.bancos.base).pipe(
      map(res => res.data)
    );
  }

  /** GET /tarjetas-credito */
  getAll(): Observable<TarjetaCredito[]> {
    return this.api.get<ApiResponse<TarjetaCredito[]>>(ENDPOINTS.tarjetas.credito).pipe(
      map(res => res.data)
    );
  }

  /** GET /tarjetas-credito/:id */
  getById(id: number): Observable<TarjetaCredito> {
    return this.api.get<ApiResponse<TarjetaCredito>>(
      ENDPOINTS.tarjetas.creditoById.replace(':id', id.toString())
    ).pipe(
      map(res => res.data)
    );
  }

  /** GET /tarjetas-credito/:id/detalle-dashboard */
  getDetalleDashboard(id: number): Observable<DetalleDashboardTarjeta> {
    return this.api.get<ApiResponse<DetalleDashboardTarjeta>>(
      ENDPOINTS.tarjetas.detalleDashboard.replace(':id', id.toString())
    ).pipe(
      map(res => res.data)
    );
  }

  /** GET /tarjetas-credito/:id/cuotas-pendientes */
  getCuotasPendientes(id: number): Observable<ReporteCuotasPendientes> {
    return this.api.get<ApiResponse<ReporteCuotasPendientes>>(
      ENDPOINTS.tarjetas.cuotasPendientes.replace(':id', id.toString())
    ).pipe(
      map(res => res.data)
    );
  }

  /** GET /tarjetas-credito/:id/proyeccion-12-meses */
  getProyeccion12Meses(id: number): Observable<Proyeccion12Meses> {
    return this.api.get<ApiResponse<Proyeccion12Meses>>(
      ENDPOINTS.tarjetas.proyeccion12Meses.replace(':id', id.toString())
    ).pipe(
      map(res => res.data)
    );
  }

  /** POST /tarjetas-credito */
  create(dto: TarjetaCreditoRequest): Observable<TarjetaCredito> {
    return this.api.post<ApiResponse<TarjetaCredito>>(ENDPOINTS.tarjetas.credito, dto).pipe(
      map(res => res.data)
    );
  }

  /** PUT /tarjetas-credito/:id */
  update(id: number, dto: Partial<TarjetaCreditoRequest>): Observable<TarjetaCredito> {
    return this.api.put<ApiResponse<TarjetaCredito>>(
      ENDPOINTS.tarjetas.creditoById.replace(':id', id.toString()),
      dto
    ).pipe(
      map(res => res.data)
    );
  }

  /** DELETE /tarjetas-credito/:id */
  delete(id: number): Observable<void> {
    return this.api.delete<ApiResponse<void>>(
      ENDPOINTS.tarjetas.creditoById.replace(':id', id.toString())
    ).pipe(
      map(res => res.data)
    );
  }
}
