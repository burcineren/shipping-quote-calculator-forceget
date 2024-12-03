import { assertInInjectionContext, inject, Injector, runInInjectionContext } from '@angular/core';

export function assertInjector(fn: () => void, injector: Injector | undefined | null, runner?: () => never) {
  !injector && assertInInjectionContext(fn);
  const assertedInjector = injector ?? inject(Injector);

  if (!runner) return assertedInjector;
  return runInInjectionContext(assertedInjector, runner);
}
