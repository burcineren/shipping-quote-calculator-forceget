import { HttpRequest } from '@angular/common/http';
import { GenericError, OperationResult } from '@beng-core/types/generic-response';
import { environment } from 'src/environments/environment';

export function shouldSkipInterception(request: HttpRequest<unknown>): boolean {
  return request.url.indexOf(environment.url.api) === -1;
}

export function getErrorMessage(error: OperationResult | GenericError): string {
  if (isErrorOperationResult(error)) {
    return (error as OperationResult).operationResultCode;
  }
  return (error as GenericError)?.message ?? (error as unknown as string);
}

export function isErrorOperationResult(error: OperationResult | GenericError): boolean {
  return error && typeof error !== 'string' && ('operationResultCode' in error || 'reMessageList' in error);
}

export function generateCacheTime(value: number, type: 'seconds' | 'minutes' | 'hours'): number {
  switch (type) {
    case 'seconds':
      return value * 1000;
    case 'minutes':
      return value * 1000 * 60;
    case 'hours':
      return value * 1000 * 60 * 60;
    default:
      throw new Error(`Invalid cache time type: ${type}`);
  }
}
