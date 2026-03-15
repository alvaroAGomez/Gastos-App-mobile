import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { ApiResponse } from '../../../core/models/api-response.model';
import {
  Gasto,
  CreateGastoRequest,
  GastoListadoFiltro,
  GastosListadoResponse,
  GastoDashboardFiltro,
  GastoDashboardItem,
} from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  constructor(private api: ApiService) {}

  /**
   * GET /gastos
   * Listado paginado con filtros opcionales.
   */
  getGastosPaginados(filtros: GastoListadoFiltro): Observable<GastosListadoResponse> {
    return this.api.get<ApiResponse<GastosListadoResponse>>(ENDPOINTS.gastos.base, filtersToParams(filtros)).pipe(
      map(res => res.data)
    );
  }

  /**
   * GET /gastos/dashboard
   * Últimos gastos para mostrar en el dashboard.
   */
  getGastosDashboard(filtros?: GastoDashboardFiltro): Observable<GastoDashboardItem[]> {
    return this.api.get<ApiResponse<{ gastos: GastoDashboardItem[] }>>(ENDPOINTS.gastos.dashboard, filtros).pipe(
      map(res => res.data.gastos)
    );
  }

  /**
   * POST /gastos
   * Crear un nuevo gasto (normal, cuotas o débito auto).
   */
  createGasto(dto: CreateGastoRequest): Observable<Gasto> {
    return this.api.post<ApiResponse<Gasto>>(ENDPOINTS.gastos.base, dto).pipe(
      map(res => res.data)
    );
  }

  /**
   * POST /gastos/materializar-debito/:debitoConfigId
   * Generar un gasto puntual a partir de una configuración de débito automático.
   */
  materializarDebito(debitoConfigId: number, fecha?: string): Observable<Gasto> {
    const url = ENDPOINTS.gastos.materializarDebito.replace(
      ':debitoConfigId',
      debitoConfigId.toString()
    );
    return this.api.post<ApiResponse<Gasto>>(url, fecha ? { fecha } : {}).pipe(
      map(res => res.data)
    );
  }

  // Los siguientes endpoints no existen en el backend actual (pendiente):
  // getGastoById(id: number): Observable<Gasto> { ... }
  // updateGasto(id: number, dto: UpdateGastoDto): Observable<Gasto> { ... }
  // deleteGasto(id: number): Observable<void> { ... }
}

function filtersToParams(filtros: any): any {
  const params: any = {};
  Object.keys(filtros).forEach(key => {
    if (filtros[key] !== undefined && filtros[key] !== null && filtros[key] !== '') {
      params[key] = filtros[key];
    }
  });
  return params;
}
