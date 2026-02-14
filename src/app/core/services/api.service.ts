import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { params: httpParams });
  }

  post<T>(endpoint: string, body: any, params?: any): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body, { params: httpParams });
  }

  put<T>(endpoint: string, body: any, params?: any): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body, { params: httpParams });
  }

  delete<T>(endpoint: string, params?: any): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { params: httpParams });
  }

  patch<T>(endpoint: string, body: any, params?: any): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    return this.http.patch<T>(`${this.apiUrl}${endpoint}`, body, { params: httpParams });
  }

  private buildHttpParams(params?: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return httpParams;
  }
}
