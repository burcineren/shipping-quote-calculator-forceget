import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@beng-core/services/auth.service';
import { TranslocoService } from '@jsverse/transloco';
import { shouldSkipInterception } from '@beng-core/utils/http.utils';

function buildHeaders(request: HttpRequest<unknown>): { [name: string]: string | string[] } {
  const headers: { [name: string]: string | string[] } = {};
  const authService = inject(AuthService);
  const translocoService = inject(TranslocoService);
  const token = authService.token;
  const currentLang = translocoService.getActiveLang();

  if (!request.headers.has('Authorization') && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (!request.headers.has('Accept')) {
    headers['Accept'] = 'application/json';
  }

  if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  headers['Collation'] = currentLang;

  return headers;
}

export const ApiInterceptor: HttpInterceptorFn = (request, next) => {
  if (shouldSkipInterception(request)) {
    return next(request);
  }

  const setHeaders = buildHeaders(request);

  return next(
    request.clone({
      setHeaders,
    }),
  );
};
