import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { ApiResponse } from '../../../core/models/api-response.model';
import {
  GraficoBarrasDto,
  GraficoTortaDto,
  GraficoLineaDto,
} from '../models/reportes.models';

export interface FiltroGastoPorCategoria {
  tarjetaId: number;       // requerido
  año?: number;
  mes?: number;            // 1-12
  categoriaId?: number;
  tipoGasto?: number;      // 1=Normal, 2=Cuotas, 3=Débito
}

export interface FiltroActualVsFuturo {
  tarjetaId: number;       // requerido
  meses?: number;          // default 6, max 12
  año?: number;
}

export interface FiltroEvolucionGastos {
  tarjetaId?: number;
  meses?: number;          // default 6, max 12
}

export interface FiltroGastoPorTarjeta {
  año?: number;
  mes?: number;            // 1-12
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  constructor(private api: ApiService) {}

  /** GET /reportes/gasto-por-categoria */
  getGastoPorCategoria(filtros: FiltroGastoPorCategoria): Observable<GraficoTortaDto> {
    return this.api.get<ApiResponse<GraficoTortaDto>>(ENDPOINTS.reportes.gastoPorCategoria, filtros).pipe(
      map(res => res.data)
    );
  }

  /** GET /reportes/actual-vs-futuro */
  getActualVsFuturo(filtros: FiltroActualVsFuturo): Observable<GraficoBarrasDto> {
    return this.api.get<ApiResponse<GraficoBarrasDto>>(ENDPOINTS.reportes.actualVsFuturo, filtros).pipe(
      map(res => res.data)
    );
  }

  /** GET /reportes/evolucion-gastos */
  getEvolucionGastos(filtros?: FiltroEvolucionGastos): Observable<GraficoLineaDto> {
    return this.api.get<ApiResponse<GraficoLineaDto>>(ENDPOINTS.reportes.evolucionGastos, filtros).pipe(
      map(res => res.data)
    );
  }

  /** GET /reportes/gasto-por-tarjeta */
  getGastoPorTarjeta(filtros?: FiltroGastoPorTarjeta): Observable<GraficoBarrasDto> {
    return this.api.get<ApiResponse<GraficoBarrasDto>>(ENDPOINTS.reportes.gastoPorTarjeta, filtros).pipe(
      map(res => res.data)
    );
  }
}
