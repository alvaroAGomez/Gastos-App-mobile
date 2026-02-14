import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { Cuota, ResumenAnualCuotas, ResumenMensualCuotas } from '../models/cuota.model';

@Injectable({
  providedIn: 'root'
})
export class CuotasService {
  constructor(private api: ApiService) {}

  getCuotasPendientes(): Observable<Cuota[]> {
    return this.api.get<Cuota[]>(ENDPOINTS.cuotas.pendientes);
  }

  marcarPagada(id: number): Observable<void> {
    return this.api.post<void>(ENDPOINTS.cuotas.marcarPagada.replace(':id', id.toString()), {});
  }

  // Estos endpoints no estaban definidos en ENDPOINTS original, asumo estructura
  getResumenMensual(anio: number, mes: number): Observable<ResumenMensualCuotas> {
    return this.api.get<ResumenMensualCuotas>(`/cuotas/resumen/${anio}/${mes}`);
  }

  getResumenAnual(anio: number): Observable<ResumenAnualCuotas> {
    return this.api.get<ResumenAnualCuotas>(`/cuotas/resumen/${anio}`);
  }
}
