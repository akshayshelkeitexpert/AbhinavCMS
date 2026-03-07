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

export interface ContactRow {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string | null;
  is_active: number;
  created_at: string;
  updated_at: string | null;
}

export interface QuoteRow {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  type: string | null;
  timeline: string | null;
  budget: string | null;
  message: string | null;
  is_active: number;
  created_at: string;
  updated_at: string | null;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Commtext': environment.apiCommtext,
  });

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('authToken') ?? localStorage.getItem('user_token')
        : null;
    let h = new HttpHeaders({
      'Content-Type': 'application/json',
      Commtext: environment.apiCommtext,
    });
    if (token) {
      h = h.set('Authkey', token);
    }
    return h;
  }

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

  login(
    username: string,
    password: string
  ): Observable<ApiResponse<{ user_token: string; [key: string]: unknown }>> {
    return this.http.post<
      ApiResponse<{ user_token: string; [key: string]: unknown }>
    >(
      `${this.baseUrl}/common/login`,
      { username, password },
      { headers: this.headers }
    );
  }

  getContacts(): Observable<ApiResponse<ContactRow[]>> {
    return this.http.get<ApiResponse<ContactRow[]>>(
      `${this.baseUrl}/admin/contact-list`,
      { headers: this.authHeaders() }
    );
  }

  deleteContact(id: number): Observable<ApiResponse<unknown>> {
    return this.http.post<ApiResponse<unknown>>(
      `${this.baseUrl}/admin/contact-delete`,
      { id },
      { headers: this.authHeaders() }
    );
  }

  getQuotes(): Observable<ApiResponse<QuoteRow[]>> {
    return this.http.get<ApiResponse<QuoteRow[]>>(
      `${this.baseUrl}/admin/quote-list`,
      { headers: this.authHeaders() }
    );
  }

  deleteQuote(id: number): Observable<ApiResponse<unknown>> {
    return this.http.post<ApiResponse<unknown>>(
      `${this.baseUrl}/admin/quote-delete`,
      { id },
      { headers: this.authHeaders() }
    );
  }

  getDashboardAnalytics(): Observable<
    ApiResponse<{ contactedCount: number; quotesRequestedCount: number }>
  > {
    return this.http.get<
      ApiResponse<{ contactedCount: number; quotesRequestedCount: number }>
    >(`${this.baseUrl}/admin/get-dashboard-analytics`, {
      headers: this.authHeaders(),
    });
  }
}
