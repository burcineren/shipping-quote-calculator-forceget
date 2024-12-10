import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';
import { LocalStorageService } from '@beng-core/services/local-storage.service';
import { AuthStateModel } from '@beng-core/states/auth-state/auth-state.type';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const authState = localStorageService.get<AuthStateModel>(LocalStorageKeysEnum.AUTH_STATE);
  const token = authState?.token;

  // Başlıkları ayarla
  const headers = req.headers
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json');

  // const authHeaders = token ? headers.set('Authorization', `Bearer ${token}`) : headers;

  // İsteği klonla ve başlıkları ekle
  const clonedRequest = req.clone({ headers: headers });

  return next(clonedRequest);
};
