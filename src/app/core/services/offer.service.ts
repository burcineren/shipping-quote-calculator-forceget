import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private apiUrl = 'http://localhost:5500/api/offers';

  constructor(private http: HttpClient) {}

  getOffers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createOffer(offer: any): Observable<any> {
    return this.http.post(this.apiUrl, offer);
  }

  deleteOffer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}