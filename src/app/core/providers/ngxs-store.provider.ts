import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideStore } from '@ngxs/store';
import { ɵStateClass } from '@ngxs/store/internals';

const ROOT_STATES: ɵStateClass[] = [];

export function provideNgxsStore(): ApplicationConfig['providers'] {
  return [
    provideStore(ROOT_STATES, {
      developmentMode: isDevMode(),
    }),
  ];
}
