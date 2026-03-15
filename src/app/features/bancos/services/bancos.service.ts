import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Banco } from '../models/banco.model';

export interface CreateBancoDto {
  nombre: string;
  logo_url?: string;
}

export interface UpdateBancoDto extends Partial<CreateBancoDto> {}

@Injectable({
  providedIn: 'root'
})
export class BancosService {
  constructor(private api: ApiService) {}

  /** GET /bancos */
  getBancos(): Observable<Banco[]> {
    return this.api.get<ApiResponse<Banco[]>>(ENDPOINTS.bancos.base).pipe(
      map(res => res.data)
    );
  }

  /** GET /bancos/:id */
  getById(id: number): Observable<Banco> {
    return this.api.get<ApiResponse<Banco>>(ENDPOINTS.bancos.byId.replace(':id', id.toString())).pipe(
      map(res => res.data)
    );
  }

  /** POST /bancos */
  create(dto: CreateBancoDto): Observable<Banco> {
    return this.api.post<ApiResponse<Banco>>(ENDPOINTS.bancos.base, dto).pipe(
      map(res => res.data)
    );
  }

  /** PATCH /bancos/:id */
  update(id: number, dto: UpdateBancoDto): Observable<Banco> {
    return this.api.patch<ApiResponse<Banco>>(ENDPOINTS.bancos.byId.replace(':id', id.toString()), dto).pipe(
      map(res => res.data)
    );
  }

  /** DELETE /bancos/:id */
  delete(id: number): Observable<void> {
    return this.api.delete<ApiResponse<void>>(ENDPOINTS.bancos.byId.replace(':id', id.toString())).pipe(
      map(res => res.data)
    );
  }
}
