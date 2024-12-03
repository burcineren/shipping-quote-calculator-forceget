import { MonoTypeOperatorFunction, Observable, pipe, Subject, UnaryFunction } from 'rxjs';
import { delay, filter, map, takeUntil, tap } from 'rxjs/operators';

export function mapToNull<T>(): UnaryFunction<Observable<T>, Observable<null>> {
  return pipe(map(() => null));
}

export function filterFalsy<T>(): UnaryFunction<Observable<T>, Observable<NonNullable<T>>> {
  return pipe(filter(Boolean));
}

export function filterString(): UnaryFunction<Observable<string>, Observable<NonNullable<string>>> {
  return pipe(filter((data: unknown) => typeof data === 'string'));
}

export function takeUntilResponse<T>(): MonoTypeOperatorFunction<T> {
  const destroy$ = new Subject<void>();

  return pipe(
    tap((response) => (response as { ok: boolean }).ok && destroy$.next()),
    takeUntil(destroy$.pipe(delay(0))),
  );
}
