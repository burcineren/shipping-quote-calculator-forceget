import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AUTO_ERROR_HANDLING_HTTP_CONTEXT } from '@beng-core/constants/http-context.constant';
import { ToastrService } from 'ngx-toastr';

export const ErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const toasterService = inject(ToastrService);

  return next(request).pipe(
    catchError((errorResponse: HttpErrorResponse | HttpResponse<unknown>) => {
      const autoErrorHandling = request.context.get(AUTO_ERROR_HANDLING_HTTP_CONTEXT);

      if (errorResponse instanceof HttpErrorResponse && autoErrorHandling) {
        handleHttpError(errorResponse, toasterService);
      }

      return throwError(() => errorResponse);
    }),
  );
};

function handleHttpError(error: HttpErrorResponse, toasterService: ToastrService): void {
  toasterService.error(error.status.toString());
}
