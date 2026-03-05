import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactCreatePayload {
  name: string;
  email: string;
  subject?: string;
  message?: string;
}

export interface QuoteCreatePayload {
  name: string;
  email: string;
  phone?: string;
  type?: string;
  timeline?: string;
  budget?: string;
  message?: string;
}

export interface ApiResponse<T = unknown> {
  statusCode: number;
  statusMessage: string;
  respData?: T;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Commtext': environment.apiCommtext,
  });

  constructor(private http: HttpClient) {}

  createContact(payload: ContactCreatePayload): Observable<ApiResponse<{ id: number }>> {
    return this.http.post<ApiResponse<{ id: number }>>(
      `${this.baseUrl}/common/contact-create`,
      payload,
      { headers: this.headers }
    );
  }

  createQuote(payload: QuoteCreatePayload): Observable<ApiResponse<{ id: number }>> {
    return this.http.post<ApiResponse<{ id: number }>>(
      `${this.baseUrl}/common/quote-create`,
      payload,
      { headers: this.headers }
    );
  }
}
