import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService, ApiResponse } from '../services/api.service';

const AUTH_TOKEN_KEY = 'authToken';
const AUTH_USER_KEY = 'authUser';

export interface LoginResponse {
  user_id: number;
  user_name?: string;
  user_email?: string;
  user_phone?: string;
  user_token: string;
  user_role?: { role_code: number; role_name?: string };
  [key: string]: unknown;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  getToken(): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(AUTH_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(
    username: string,
    password: string
  ): Observable<ApiResponse<{ user_token: string; [key: string]: unknown }>> {
    return this.api.login(username, password).pipe(
      tap((res) => {
        if (res.statusCode === 200 && res.respData?.user_token) {
          localStorage.setItem(AUTH_TOKEN_KEY, res.respData.user_token);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(res.respData));
        }
      })
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
    this.router.navigate(['/crm/signin']);
  }

  getStoredUser(): LoginResponse | null {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as LoginResponse;
    } catch {
      return null;
    }
  }
}
