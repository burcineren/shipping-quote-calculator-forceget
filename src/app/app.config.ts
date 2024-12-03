import { ApplicationConfig, enableProdMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from 'src/environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptor } from '@beng-core/interceptors/api.interceptor';
import { ErrorInterceptor } from '@beng-core/interceptors/error.interceptor';
import { provideHttpCache, withHttpCacheInterceptor } from '@ngneat/cashew';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxsStore } from '@beng-core/providers/ngxs-store.provider';
import { provideTransloco } from '@beng-core/providers/transloco.provider';

if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([ApiInterceptor, ErrorInterceptor, withHttpCacheInterceptor()])),
    provideHttpCache({
      strategy: 'explicit',
    }),
    provideNgxsStore(),
    provideTransloco(),
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
  ],
};
