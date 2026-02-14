import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Usuario, UpdatePerfilDto } from '../models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor(private api: ApiService) {}

  getPerfil(): Observable<Usuario> {
    // Mock for now until endpoint is confirmed or use auth service user
    return of({ id: 1, nombre: 'Usuario Demo', email: 'demo@gastos.app' });
  }

  updatePerfil(dto: UpdatePerfilDto): Observable<Usuario> {
    // Mock
    return of({ id: 1, nombre: dto.nombre || 'Usuario Demo', email: 'demo@gastos.app' });
  }
}
