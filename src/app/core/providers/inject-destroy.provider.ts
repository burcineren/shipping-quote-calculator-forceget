import { DestroyRef, inject, Injector, runInInjectionContext } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { assertInjector } from '@beng-core/utils/assert.utils';

export function injectDestroy(injector?: Injector): ReplaySubject<void> & { onDestroy: DestroyRef['onDestroy'] } {
  injector = assertInjector(injectDestroy, injector);

  return runInInjectionContext(injector, () => {
    const destroyRef = inject(DestroyRef);

    const subject$ = new ReplaySubject<void>(1);

    destroyRef.onDestroy(() => {
      subject$.next();
      subject$.complete();
    });

    Object.assign(subject$, {
      onDestroy: destroyRef.onDestroy.bind(destroyRef),
    });

    return subject$ as ReplaySubject<void> & {
      onDestroy: DestroyRef['onDestroy'];
    };
  });
}
