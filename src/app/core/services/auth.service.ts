import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  ) { }

  /**
   * Login işlemi
   * @param email Kullanıcı email adresi
   * @param password Kullanıcı şifresi
   */
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  /**
   * Register işlemi
   * @param email Kullanıcı email adresi
   * @param password Kullanıcı şifresi
   * @param confirmPassword Kullanıcı şifre doğrulama
   */
  register(email: string, password: string, confirmPassword: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/register`, { email, password, confirmPassword });
  }
  
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.localStorageService.remove(LocalStorageKeysEnum.AUTH_STATE);
      })
    );
  }

  getToken(): string | null {
    const authState = this.localStorageService.get<{ token: string }>(LocalStorageKeysEnum.AUTH_STATE);
    return authState?.token || null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}