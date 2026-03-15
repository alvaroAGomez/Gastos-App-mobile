import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { ApiResponse } from '../../../core/models/api-response.model';
import { ResumenFinancieroDto, DashboardTarjetasResponse } from '../../../shared/models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private api: ApiService) {}

  /** GET /dashboard/resumen-financiero */
  getResumenFinanciero(): Observable<ResumenFinancieroDto> {
    return this.api.get<ApiResponse<ResumenFinancieroDto>>(ENDPOINTS.dashboard.resumenFinanciero).pipe(
      map(res => res.data)
    );
  }

  /** GET /dashboard/tarjetas */
  getResumenTarjetas(): Observable<DashboardTarjetasResponse> {
    return this.api.get<ApiResponse<DashboardTarjetasResponse>>(ENDPOINTS.dashboard.tarjetas).pipe(
      map(res => res.data)
    );
  }
}
