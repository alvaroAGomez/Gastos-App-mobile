import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { Categoria, CreateCategoriaDto, UpdateCategoriaDto } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  constructor(private api: ApiService) {}

  getCategoriasGlobales(): Observable<Categoria[]> {
    return this.api.get<Categoria[]>(ENDPOINTS.categorias.base);
  }

  getCategoriasUsuario(): Observable<Categoria[]> {
    return this.api.get<Categoria[]>(ENDPOINTS.categorias.personalizadas);
  }

  createPersonalizada(dto: CreateCategoriaDto): Observable<Categoria> {
    return this.api.post<Categoria>(ENDPOINTS.categorias.personalizadas, dto);
  }

  updatePersonalizada(id: number, dto: UpdateCategoriaDto): Observable<Categoria> {
    return this.api.put<Categoria>(ENDPOINTS.categorias.personalizadas + `/${id}`, dto);
  }

  deletePersonalizada(id: number): Observable<void> {
    return this.api.delete<void>(ENDPOINTS.categorias.personalizadas + `/${id}`);
  }
}
