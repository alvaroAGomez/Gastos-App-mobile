import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { PaginatedResponse } from '../../../core/models/api-response.model';
import { Gasto, CreateGastoRequest, UpdateGastoDto, GastosFiltro, GastoListadoFiltro, GastosListadoResponse } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  constructor(private api: ApiService) {}

  getGastosPaginados(filtros: GastoListadoFiltro): Observable<GastosListadoResponse> {
    return this.api.get<GastosListadoResponse>(ENDPOINTS.gastos.base, filtersToParams(filtros));
  }



  getGastoById(id: number): Observable<Gasto> {
    return this.api.get<Gasto>(ENDPOINTS.gastos.byId.replace(':id', id.toString()));
  }

  createGasto(dto: CreateGastoRequest): Observable<Gasto> {
    return this.api.post<Gasto>(ENDPOINTS.gastos.base, dto);
  }

  updateGasto(id: number, dto: UpdateGastoDto): Observable<Gasto> {
    return this.api.put<Gasto>(ENDPOINTS.gastos.byId.replace(':id', id.toString()), dto);
  }

  deleteGasto(id: number): Observable<void> {
    return this.api.delete<void>(ENDPOINTS.gastos.byId.replace(':id', id.toString()));
  }
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
