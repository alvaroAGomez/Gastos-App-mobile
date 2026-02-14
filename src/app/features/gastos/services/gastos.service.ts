import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { PaginatedResponse } from '../../../core/models/api-response.model';
import { Gasto, CreateGastoDto, UpdateGastoDto, GastosFiltro } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  constructor(private api: ApiService) {}

  getGastosPaginados(filtros: GastosFiltro): Observable<PaginatedResponse<Gasto>> {
    return this.api.get<PaginatedResponse<Gasto>>(ENDPOINTS.gastos.paginated, filtersToParams(filtros));
  }

  getGastoById(id: number): Observable<Gasto> {
    return this.api.get<Gasto>(ENDPOINTS.gastos.byId.replace(':id', id.toString()));
  }

  createGasto(dto: CreateGastoDto): Observable<Gasto> {
    return this.api.post<Gasto>(ENDPOINTS.gastos.base, dto);
  }

  updateGasto(id: number, dto: UpdateGastoDto): Observable<Gasto> {
    return this.api.put<Gasto>(ENDPOINTS.gastos.byId.replace(':id', id.toString()), dto);
  }

  deleteGasto(id: number): Observable<void> {
    return this.api.delete<void>(ENDPOINTS.gastos.byId.replace(':id', id.toString()));
  }
}

function filtersToParams(filtros: GastosFiltro): any {
  // Helper to convert filters object to query params object if needed
  return { ...filtros };
}
