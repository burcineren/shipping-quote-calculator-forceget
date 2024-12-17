import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5500/api/auth'; // API base URL

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  /**
   * Login işlemi
   * @param email Kullanıcı email adresi
   * @param password Kullanıcı şifresi
   */
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        // Save the token in localStorage
        if (response.token) {
          this.localStorageService.set(LocalStorageKeysEnum.AUTH_STATE, { token: response.token });
        }
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  /**
   * Register işlemi
   * @param email Kullanıcı email adresi
   * @param password Kullanıcı şifresi
   * @param confirmPassword Kullanıcı şifre doğrulama
   */
  register(email: string, password: string, confirmPassword: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, { email, password, confirmPassword }).pipe(
      catchError((error) => {
        console.error('Registration failed', error);
        return throwError(() => new Error('Registration failed'));
      })
    );
  }

  /**
   * Logout işlemi
   */
  logout(): Observable<void> {
    const token = this.getToken();
  
    return this.http.post<void>(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).pipe(
      tap(() => {
        this.localStorageService.remove(LocalStorageKeysEnum.AUTH_STATE);
      }),
      catchError((error) => {
        console.warn('Logout API failed, clearing local storage anyway');
        this.localStorageService.remove(LocalStorageKeysEnum.AUTH_STATE);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get the authentication token from localStorage
   */
  getToken(): string | null {
    const authState = this.localStorageService.get<{ token: string }>(LocalStorageKeysEnum.AUTH_STATE);
    return authState?.token || null;
  }

  /**
   * Check if the user is authenticated based on the token
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
