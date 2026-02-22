import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { 
  GraficoBarrasDto,
  GraficoTortaDto,
  GraficoLineaDto,
  FiltroReportesDto
} from '../models/reportes.models';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  constructor(private api: ApiService) {}

  getGraficoBarras(filtros: FiltroReportesDto): Observable<GraficoBarrasDto> {
    return this.api.post<GraficoBarrasDto>(ENDPOINTS.reportes.serieTemporal, filtros);
  }

  getGraficoTorta(filtros: FiltroReportesDto): Observable<GraficoTortaDto> {
    return this.api.post<GraficoTortaDto>(ENDPOINTS.reportes.totalesPorCategoria, filtros);
  }

  getGraficoLinea(filtros: FiltroReportesDto): Observable<GraficoLineaDto> {
    return this.api.post<GraficoLineaDto>(ENDPOINTS.reportes.serieTemporal + '/linea', filtros);
  }
}
