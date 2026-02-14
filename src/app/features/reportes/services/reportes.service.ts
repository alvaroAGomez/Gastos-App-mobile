import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { 
  ReporteResumenMensualDto,
  ReporteResumenAnualDto,
  ReporteTotalesDto,
  ReporteSerieDto
} from '../models/reportes.models';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  constructor(private api: ApiService) {}

  getResumenMensual(anio: number, mes: number, tarjetaCreditoId?: number): Observable<ReporteResumenMensualDto> {
    const params: any = { anio, mes };
    if (tarjetaCreditoId) params.tarjetaCreditoId = tarjetaCreditoId;
    return this.api.get<ReporteResumenMensualDto>(ENDPOINTS.reportes.resumenMensual, params);
  }

  getResumenAnual(anio: number, tarjetaCreditoId?: number): Observable<ReporteResumenAnualDto> {
    const params: any = { anio };
    if (tarjetaCreditoId) params.tarjetaCreditoId = tarjetaCreditoId;
    return this.api.get<ReporteResumenAnualDto>(ENDPOINTS.reportes.resumenAnual, params);
  }

  getTotalesPorCategoria(desde?: string, hasta?: string, tarjetaId?: number): Observable<ReporteTotalesDto[]> {
    const params: any = {};
    if (desde) params.desde = desde;
    if (hasta) params.hasta = hasta;
    if (tarjetaId) params.tarjetaId = tarjetaId;
    return this.api.get<ReporteTotalesDto[]>(ENDPOINTS.reportes.totalesPorCategoria, params);
  }

  getSerieTemporalGastos(
    desde: string,
    hasta: string,
    agrupacion: 'dia' | 'semana' | 'mes',
    tarjetaId?: number,
    categoriaId?: number
  ): Observable<ReporteSerieDto> {
    const params: any = { desde, hasta, agrupacion };
    if (tarjetaId) params.tarjetaId = tarjetaId;
    if (categoriaId) params.categoriaId = categoriaId;
    return this.api.get<ReporteSerieDto>(ENDPOINTS.reportes.serieTemporal, params);
  }
}
