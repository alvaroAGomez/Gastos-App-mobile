import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { ENDPOINTS } from '../constants/endpoints';
import { ApiResponse } from '../models/api-response.model';

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
}

interface AuthData {
  access_token: string;
  user?: any;
}

interface JwtPayload {
  sub?: number;
  exp?: number;
  [key: string]: any;
}

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState$ = new BehaviorSubject<boolean>(false);

  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router
  ) {
    this.checkAuth();
  }

  private async checkAuth(): Promise<void> {
    await this.storage.ready();
    const token = await this.getToken();
    this.authState$.next(!!token);
  }

  login(dto: LoginDto): Observable<ApiResponse<AuthData>> {
    return this.api.post<ApiResponse<AuthData>>(ENDPOINTS.auth.login, dto).pipe(
      // Usamos switchMap para asegurar que el guardado sea secuencial y esperar a que termine
      switchMap(response => {
        if (response.ok && response.data.access_token) {
          return from(this.storage.set(TOKEN_KEY, response.data.access_token)).pipe(
            tap(() => this.authState$.next(true)),
            map(() => response)
          );
        }
        return of(response);
      })
    );
  }

  register(dto: RegisterDto): Observable<ApiResponse<AuthData>> {
    return this.api.post<ApiResponse<AuthData>>(ENDPOINTS.auth.register, dto).pipe(
      switchMap(response => {
        if (response.ok && response.data.access_token) {
          return from(this.storage.set(TOKEN_KEY, response.data.access_token)).pipe(
            tap(() => this.authState$.next(true)),
            map(() => response)
          );
        }
        return of(response);
      })
    );
  }

  async logout(): Promise<void> {
    await this.storage.remove(TOKEN_KEY);
    this.authState$.next(false);
    this.router.navigate(['/auth/login']);
  }

  async getToken(): Promise<string | null> {
    await this.storage.ready();
    return await this.storage.get<string>(TOKEN_KEY);
  }

  isLoggedIn(): Observable<boolean> {
    return this.authState$.asObservable();
  }

  get isLoggedInValue(): boolean {
    return this.authState$.value;
  }

  async getUserId(): Promise<number | null> {
    const token = await this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.sub || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  async getTokenExpiration(): Promise<Date | null> {
    const token = await this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        return new Date(decoded.exp * 1000);
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  async isTokenExpired(): Promise<boolean> {
    const expiration = await this.getTokenExpiration();
    if (!expiration) return true;
    return expiration.getTime() < Date.now();
  }

  /** GET /auth/profile */
  getProfile(): Observable<ApiResponse<any>> {
    return this.api.get<ApiResponse<any>>(ENDPOINTS.auth.profile);
  }
}
