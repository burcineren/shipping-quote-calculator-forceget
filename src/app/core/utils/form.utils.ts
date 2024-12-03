import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Extract arguments of function
 */
type ArgumentsType<F> = F extends (...args: infer A) => unknown ? A : never;

/**
 * Creates an object like O. Optionally provide minimum set of properties P which the objects must share to conform
 */
type ObjectLike<O extends object, P extends keyof O = keyof O> = Pick<O, P>;

/**
 * Extract a touched changed observable from an abstract control
 * @param control AbstractControl like object with markAsTouched method
 */
export function getFormControlTouchedChanges$(
  control: ObjectLike<AbstractControl, 'markAsTouched' | 'markAsUntouched' | 'touched'>,
): Observable<boolean> {
  const prevMarkAsTouched = control.markAsTouched.bind(control);
  const prevMarkAsUntouched = control.markAsUntouched.bind(control);

  const touchedChanges$ = new BehaviorSubject<boolean>(control.touched);

  function nextMarkAsTouched(...args: ArgumentsType<AbstractControl['markAsTouched']>) {
    prevMarkAsTouched(...args);
    touchedChanges$.next(true);
  }

  function nextMarkAsUntouched(...args: ArgumentsType<AbstractControl['markAsUntouched']>) {
    prevMarkAsUntouched(...args);
    touchedChanges$.next(false);
  }

  control.markAsTouched = nextMarkAsTouched;
  control.markAsUntouched = nextMarkAsUntouched;

  return touchedChanges$;
}
