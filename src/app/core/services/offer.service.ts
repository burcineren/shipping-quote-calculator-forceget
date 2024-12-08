import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';
import { AuthStateModel } from '@beng-core/states/auth-state/auth-state.type';

@Injectable({
    providedIn: 'root',
})
export class OfferService {
    private apiUrl = 'http://localhost:5500/api/offers';

    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) { }

    private getHeaders(): HttpHeaders {
        const authState: AuthStateModel = this.localStorageService.get(
            LocalStorageKeysEnum.AUTH_STATE
        ) as AuthStateModel;
        const token = authState?.token;

        let headers = new HttpHeaders()
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    }

    getOffers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
    }

    createOffer(offer: any): Observable<any> {
        return this.http.post(this.apiUrl, offer, { headers: this.getHeaders() });
    }

    deleteOffer(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }
}