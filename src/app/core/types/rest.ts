import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ContextOptions } from '@ngneat/cashew/lib/cache-context';
import { GenericError } from './generic-response';
import { ResponseTypeEnum } from '@beng-core/enums/response-type.enum';

export type RestObserve = 'body' | 'events' | 'response';

export type RestParams =
  | HttpParams
  | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };

export type RestHeaders =
  | HttpHeaders
  | {
      [header: string]: string | string[];
    };

export type ResponseType = `${ResponseTypeEnum}`;

export interface RestConfig {
  baseUrl?: string;
  desc?: string;
  headers?: RestHeaders;
  autoErrorHandling?: boolean;
  observe?: RestObserve;
  queryParams?: RestParams;
  withBrandCode?: boolean;
  withCache?: number | boolean;
  responseType?: ResponseType;
}

export type RestCacheConfig = ContextOptions;

export interface RestRequest<T = null> {
  body?: T;
  headers?: RestHeaders;
  method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'CONNECT' | 'TRACE' | 'OPTIONS';
  params?: RestParams;
  observe?: 'body' | 'events' | 'response';
  reportProgress?: boolean;
  responseType?: ResponseType;
  withCredentials?: boolean;
  url: string;
}

export interface RestError {
  autoErrorHandling: boolean;
  response: GenericError;
  status: number;
  type: string;
}
