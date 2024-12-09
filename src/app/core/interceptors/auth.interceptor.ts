import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';
import { AuthStateModel } from '@beng-core/states/auth-state/auth-state.type';
import { LocalStorageService } from '@beng-core/services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Tip belirterek token'a erişim
    const authState = this.localStorageService.get<AuthStateModel>(LocalStorageKeysEnum.AUTH_STATE);
    const token = authState?.token;

    // Başlıkları ayarla
    const headers = req.headers
      .set('Accept', 'application/json')
      .set( 'Authorization',`Bearer ${token}`)
      .set('Content-Type', 'application/json');

    // const authHeaders = token ? headers.set('Authorization', `Bearer ${token}`) : headers;

    // İsteği klonla ve başlıkları ekle
    const clonedRequest = req.clone({ headers: headers });

    return next.handle(clonedRequest);
  }
}