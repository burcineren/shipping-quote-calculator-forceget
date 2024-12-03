import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  private environment = environment;

  getTranslation(lang: string) {
    return this.http.get<Translation>(`${this.environment.url.app}/assets/i18n/${lang}.json`);
  }
}
