import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { ENDPOINTS } from '../constants/endpoints';

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto {
  nombre?: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user?: any;
}

interface JwtPayload {
  userId?: number;
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
    const token = await this.getToken();
    this.authState$.next(!!token);
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(ENDPOINTS.auth.login, dto).pipe(
      tap(async (response) => {
        await this.storage.set(TOKEN_KEY, response.token);
        this.authState$.next(true);
      })
    );
  }

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.api.post<AuthResponse>(ENDPOINTS.auth.register, dto).pipe(
      tap(async (response) => {
        await this.storage.set(TOKEN_KEY, response.token);
        this.authState$.next(true);
      })
    );
  }

  async logout(): Promise<void> {
    await this.storage.remove(TOKEN_KEY);
    this.authState$.next(false);
    this.router.navigate(['/auth/login']);
  }

  async getToken(): Promise<string | null> {
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
      return decoded.userId || null;
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
}
