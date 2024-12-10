import { ApplicationConfig, isDevMode, importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AuthState } from '@beng-core/states/auth-state';
import { LoaderState } from '@beng-core/states/loader-state';
import { environment } from 'src/environments/environment';

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
  ];
}