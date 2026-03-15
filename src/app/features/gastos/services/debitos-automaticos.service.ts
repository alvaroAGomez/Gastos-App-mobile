import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { ApiResponse } from '../../../core/models/api-response.model';

export interface DebitoAutomatico {
  id: number;
  descripcion: string;
  monto: number;
  moneda: 'ARS' | 'USD';
  categoriaId?: number;
  activo: boolean;
  [key: string]: any;
}

export interface UpdateDebitoConfigDto {
  categoriaId?: number;
  descripcion?: string;
  monto?: number;
  moneda?: 'ARS' | 'USD';
  activo?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DebitosAutomaticosService {
  constructor(private api: ApiService) {}

  /** GET /debitos-automaticos */
  getSuscripcionesActivas(): Observable<DebitoAutomatico[]> {
    return this.api.get<ApiResponse<DebitoAutomatico[]>>(ENDPOINTS.debitosAutomaticos.base).pipe(
      map(res => res.data)
    );
  }

  /** GET /debitos-automaticos/:id */
  getById(id: number): Observable<DebitoAutomatico> {
    return this.api.get<ApiResponse<DebitoAutomatico>>(
      ENDPOINTS.debitosAutomaticos.byId.replace(':id', id.toString())
    ).pipe(
      map(res => res.data)
    );
  }

  /** PUT /debitos-automaticos/:id/desactivar */
  desactivar(id: number): Observable<DebitoAutomatico> {
    return this.api.put<ApiResponse<DebitoAutomatico>>(
      ENDPOINTS.debitosAutomaticos.desactivar.replace(':id', id.toString()),
      {}
    ).pipe(
      map(res => res.data)
    );
  }

  /** PUT /debitos-automaticos/:id */
  update(id: number, dto: UpdateDebitoConfigDto): Observable<DebitoAutomatico> {
    return this.api.put<ApiResponse<DebitoAutomatico>>(
      ENDPOINTS.debitosAutomaticos.byId.replace(':id', id.toString()),
      dto
    ).pipe(
      map(res => res.data)
    );
  }
}
