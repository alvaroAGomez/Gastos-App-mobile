import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { ENDPOINTS } from '../../../core/constants/endpoints';
import { Banco } from '../models/banco.model';

@Injectable({
  providedIn: 'root'
})
export class BancosService {
  constructor(private api: ApiService) {}

  getBancos(): Observable<Banco[]> {
    return this.api.get<Banco[]>(ENDPOINTS.bancos.base);
  }
}
