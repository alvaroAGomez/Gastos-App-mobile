import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { TarjetaDebito, CreateTarjetaDebitoDto } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetasDebitoService {
  constructor(private api: ApiService) {}

  getAll(): Observable<TarjetaDebito[]> {
    return this.api.get<TarjetaDebito[]>(ENDPOINTS.tarjetas.debito);
  }

  getById(id: number): Observable<TarjetaDebito> {
    return this.api.get<TarjetaDebito>(ENDPOINTS.tarjetas.debitoById.replace(':id', id.toString()));
  }

  create(dto: CreateTarjetaDebitoDto): Observable<TarjetaDebito> {
    return this.api.post<TarjetaDebito>(ENDPOINTS.tarjetas.debito, dto);
  }

  update(id: number, dto: Partial<CreateTarjetaDebitoDto>): Observable<TarjetaDebito> {
    return this.api.put<TarjetaDebito>(ENDPOINTS.tarjetas.debitoById.replace(':id', id.toString()), dto);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(ENDPOINTS.tarjetas.debitoById.replace(':id', id.toString()));
  }
}
