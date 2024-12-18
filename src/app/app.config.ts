import { ApplicationConfig, enableProdMode, importProvidersFrom, provideExperimentalZonelessChangeDetection, isDevMode } from '@angular/core';
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
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { EyeInvisibleOutline, EyeOutline } from '@ant-design/icons-angular/icons';
import { authInterceptor } from '@beng-core/interceptors/auth.interceptor';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco as provideTransloco_alias } from '@ngneat/transloco';
if (environment.production) {
  enableProdMode();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withInterceptors([
      ApiInterceptor,
      authInterceptor,
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
    provideNzIcons([EyeInvisibleOutline, EyeOutline]), provideHttpClient(), provideTransloco_alias({
        config: { 
          availableLangs: ['en', 'tr'],
          defaultLang: 'en',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      }),
  ],
};
