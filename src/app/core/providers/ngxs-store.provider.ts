import { ApplicationConfig, isDevMode, importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthState } from '@beng-core/states/auth-state';
import { LoaderState } from '@beng-core/states/loader-state';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from '@beng-core/interceptors/auth.interceptor';

export function provideNgxsStore(): ApplicationConfig['providers'] {
  return [
    importProvidersFrom(
      NgxsModule.forRoot(
        [AuthState, LoaderState],
        {
          developmentMode: !environment.production,
          selectorOptions: {
            suppressErrors: false,
            injectContainerState: false,
          },
        }
      ),
      NgxsStoragePluginModule.forRoot({
        keys: ['auth'],
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ];
}