import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { ApiResponse } from '../../../core/models/api-response.model';
import { TarjetaDebito, CreateTarjetaDebitoDto } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetasDebitoService {
  constructor(private api: ApiService) {}

  getAll(): Observable<TarjetaDebito[]> {
    return this.api.get<ApiResponse<TarjetaDebito[]>>(ENDPOINTS.tarjetas.debito).pipe(
      map(res => res.data)
    );
  }

  getById(id: number): Observable<TarjetaDebito> {
    return this.api.get<ApiResponse<TarjetaDebito>>(ENDPOINTS.tarjetas.debitoById.replace(':id', id.toString())).pipe(
      map(res => res.data)
    );
  }

  create(dto: CreateTarjetaDebitoDto): Observable<TarjetaDebito> {
    return this.api.post<ApiResponse<TarjetaDebito>>(ENDPOINTS.tarjetas.debito, dto).pipe(
      map(res => res.data)
    );
  }

  update(id: number, dto: Partial<CreateTarjetaDebitoDto>): Observable<TarjetaDebito> {
    return this.api.put<ApiResponse<TarjetaDebito>>(ENDPOINTS.tarjetas.debitoById.replace(':id', id.toString()), dto).pipe(
      map(res => res.data)
    );
  }

  delete(id: number): Observable<void> {
    return this.api.delete<ApiResponse<void>>(ENDPOINTS.tarjetas.debitoById.replace(':id', id.toString())).pipe(
      map(res => res.data)
    );
  }
}
