import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { TarjetaCredito, TarjetaCreditoRequest, Banco } from '../models/tarjeta.model';

@Injectable({
  providedIn: 'root'
})
export class TarjetasCreditoService {
  constructor(private api: ApiService) {}

  getBancos(): Observable<Banco[]> {
    return this.api.get<Banco[]>(ENDPOINTS.bancos.base);
  }

  getAll(): Observable<TarjetaCredito[]> {
    return this.api.get<TarjetaCredito[]>(ENDPOINTS.tarjetas.credito);
  }

  getById(id: number): Observable<TarjetaCredito> {
    return this.api.get<TarjetaCredito>(ENDPOINTS.tarjetas.creditoById.replace(':id', id.toString()));
  }

  create(dto: TarjetaCreditoRequest): Observable<TarjetaCredito> {
    return this.api.post<TarjetaCredito>(ENDPOINTS.tarjetas.credito, dto);
  }

  update(id: number, dto: Partial<TarjetaCreditoRequest>): Observable<TarjetaCredito> {
    return this.api.put<TarjetaCredito>(ENDPOINTS.tarjetas.creditoById.replace(':id', id.toString()), dto);
  }

  delete(id: number): Observable<void> {
    return this.api.delete<void>(ENDPOINTS.tarjetas.creditoById.replace(':id', id.toString()));
  }

  getResumenDashboard(id: number): Observable<any> {
    // Retorna resumen específico para dashboard de la tarjeta (gastos mes, prox cierre, etc)
    return this.api.get<any>(ENDPOINTS.tarjetas.resumenDashboard.replace(':id', id.toString()));
  }
}
