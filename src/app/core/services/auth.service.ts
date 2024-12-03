import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageService = inject(LocalStorageService);

  get isAuthenticated(): boolean {
    return Boolean(this.localStorageService.get(LocalStorageKeysEnum.TOKEN));
  }

  get token(): string {
    return this.localStorageService.get(LocalStorageKeysEnum.TOKEN);
  }

  login(name: string): Observable<boolean> {
    this.localStorageService.set(LocalStorageKeysEnum.TOKEN, name);
    return of(true);
  }
}
