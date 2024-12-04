import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { AuthState } from '@beng-core/states/auth-state/auth.state';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.store.selectSnapshot(AuthState.getToken);

        if (token) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return next.handle(clonedReq);
        }

        return next.handle(req);
    }
}