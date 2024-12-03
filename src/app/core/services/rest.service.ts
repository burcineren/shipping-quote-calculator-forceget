import { HttpClient, HttpContext, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestCacheConfig, RestConfig, RestParams, RestRequest } from '@beng-core/types/rest';
import { withCache as withCacheContext } from '@ngneat/cashew';
import { Store } from '@ngxs/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, switchMap, take, tap } from 'rxjs/operators';
import { LoaderAddAction, LoaderRemoveAction, RestErrorAction } from '@beng-core/states/loader-state';
import { AUTO_ERROR_HANDLING_HTTP_CONTEXT } from '@beng-core/constants/http-context.constant';
import { takeUntilResponse } from '@beng-core/utils/rxjs.utils';
import { generateCacheTime } from '@beng-core/utils/http.utils';
import { ResponseTypeEnum } from '@beng-core/enums/response-type.enum';
import { environment } from 'src/environments/environment';

interface RestServiceHttpContextOptions {
  withBrandCode: boolean;
  autoErrorHandling: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private store = inject(Store);
  private http = inject(HttpClient);

  get<T>(url: string, config?: RestConfig): Observable<T> {
    return this.request<unknown, T>(
      {
        method: 'GET',
        url,
      },
      config,
    );
  }

  post<T, R>(url: string, body: T, config?: RestConfig): Observable<R> {
    return this.request<T, R>(
      {
        method: 'POST',
        url,
        body,
      },
      config,
    );
  }

  put<T>(url: string, body: T, config?: RestConfig): Observable<T> {
    return this.request<unknown, T>(
      {
        method: 'PUT',
        url,
        body,
      },
      config,
    );
  }

  delete<T>(url: string, body: T, config?: RestConfig): Observable<T> {
    return this.request<unknown, T>(
      {
        method: 'DELETE',
        url,
        body,
      },
      config,
    );
  }

  private request<T, R>(request: RestRequest<T>, config: RestConfig): Observable<R> {
    const { baseUrl, observe = 'body' } = config;
    const RestRequest = {
      ...request,
      url: (baseUrl ?? environment.url.api) + request.url,
    } as RestRequest<T>;
    return of(RestRequest).pipe(
      tap(() => this.store.dispatch(new LoaderAddAction(config.desc))),
      switchMap(({ method, url, ...options }) => {
        return this.http.request<T>(method, url, {
          ...options,
          context: this.getHttpContext(request, config),
          headers: config.headers,
          params: config.queryParams,
          responseType: config.responseType ?? ResponseTypeEnum.JSON,
        } as unknown) as unknown as Observable<R>;
      }),
      observe === 'body' ? take(1) : takeUntilResponse(),
      catchError((response: HttpErrorResponse) => {
        this.store.dispatch([
          new LoaderRemoveAction(config.desc),
          new RestErrorAction({
            autoErrorHandling: config.autoErrorHandling,
            response: response.error,
            type: config.desc,
            status: response.status,
          }),
        ]);
        return throwError(() => response);
      }),
      finalize(() => this.store.dispatch(new LoaderRemoveAction(config.desc))),
    );
  }

  private getHttpContext<T>(request: RestRequest<T>, config: RestConfig): HttpContext {
    // Default withBrandCode value is true, so we do send Brand-Code header by default
    const { withCache, withBrandCode = true, autoErrorHandling = true } = config;

    if (withCache) {
      const cacheConfig = this.getCacheConfig(withCache, request.url, request.body, config.queryParams);
      return withCacheContext({
        ...cacheConfig,
        context: this.setHttpContext({
          autoErrorHandling,
          withBrandCode,
        }),
      });
    }

    return this.setHttpContext({
      autoErrorHandling,
      withBrandCode,
    });
  }

  private setHttpContext({ autoErrorHandling }: RestServiceHttpContextOptions): HttpContext {
    return new HttpContext().set(AUTO_ERROR_HANDLING_HTTP_CONTEXT, autoErrorHandling);
  }

  private getCacheConfig(
    config: RestConfig['withCache'],
    url: string,
    requestBody: unknown,
    requestParams: RestParams,
  ): RestCacheConfig {
    if (!config) {
      return null;
    }

    const defaultCacheConfig = this.getDefaultCacheConfig(url, requestBody, requestParams);

    if (typeof config === 'boolean') {
      return {
        key: defaultCacheConfig.key,
        ttl: defaultCacheConfig.ttl,
      };
    }

    return {
      ...defaultCacheConfig,
      ttl: config,
    };
  }

  private getDefaultCacheConfig(url: string, requestBody: unknown, requestParams: RestParams): RestCacheConfig {
    const cacheId = 'cache_' + this.hashCode(url + JSON.stringify(requestBody) + JSON.stringify(requestParams));
    const ttl = generateCacheTime(1, 'hours');
    return {
      key: cacheId,
      ttl,
    };
  }

  private hashCode(object: string): number {
    return object.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0);
  }
}
