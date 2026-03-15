import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Categoria, CreateCategoriaDto, UpdateCategoriaDto } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  constructor(private api: ApiService) {}

  /** GET /categoria - todas las categorías (globales + del usuario) */
  getAll(): Observable<Categoria[]> {
    return this.api.get<ApiResponse<Categoria[]>>(ENDPOINTS.categorias.base).pipe(
      map(res => res.data)
    );
  }

  /** GET /categoria/globales */
  getCategoriasGlobales(): Observable<Categoria[]> {
    return this.api.get<ApiResponse<Categoria[]>>(ENDPOINTS.categorias.globales).pipe(
      map(res => res.data)
    );
  }

  /** GET /categoria/usuario */
  getCategoriasUsuario(): Observable<Categoria[]> {
    return this.api.get<ApiResponse<Categoria[]>>(ENDPOINTS.categorias.usuario).pipe(
      map(res => res.data)
    );
  }

  /** GET /categoria/:id */
  getById(id: number): Observable<Categoria> {
    return this.api.get<ApiResponse<Categoria>>(ENDPOINTS.categorias.byId.replace(':id', id.toString())).pipe(
      map(res => res.data)
    );
  }

  /** POST /categoria */
  create(dto: CreateCategoriaDto): Observable<Categoria> {
    return this.api.post<ApiResponse<Categoria>>(ENDPOINTS.categorias.base, dto).pipe(
      map(res => res.data)
    );
  }

  /** PATCH /categoria/:id */
  update(id: number, dto: UpdateCategoriaDto): Observable<Categoria> {
    return this.api.patch<ApiResponse<Categoria>>(
      ENDPOINTS.categorias.byId.replace(':id', id.toString()),
      dto
    ).pipe(
      map(res => res.data)
    );
  }

  /** DELETE /categoria/:id */
  delete(id: number): Observable<void> {
    return this.api.delete<ApiResponse<void>>(ENDPOINTS.categorias.byId.replace(':id', id.toString())).pipe(
      map(res => res.data)
    );
  }
}
