import { ApplicationConfig, enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptor } from '@beng-core/interceptors/api.interceptor';
import { ErrorInterceptor } from '@beng-core/interceptors/error.interceptor';
import { provideHttpCache, withHttpCacheInterceptor } from '@ngneat/cashew';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxsStore } from '@beng-core/providers/ngxs-store.provider';
import { provideTransloco } from '@beng-core/providers/transloco.provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { EyeInvisibleOutline, EyeOutline } from '@ant-design/icons-angular/icons';
if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([
      ApiInterceptor,
      ErrorInterceptor,
      withHttpCacheInterceptor(),
    ])
    ),
    provideHttpCache({
      strategy: 'explicit',
    }),
    ...provideNgxsStore(),
    provideTransloco(),
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
    provideNzIcons([EyeInvisibleOutline, EyeOutline]),
  ],
};
