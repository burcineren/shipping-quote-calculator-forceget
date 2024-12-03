import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { NgControl } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { FORM_ERRORS, ValidationErrorMessage } from '@beng-core/utils/form-validators.utils';
import { TranslocoService } from '@jsverse/transloco';
import { AsyncPipe, NgClass } from '@angular/common';
import { injectDestroy } from '@beng-core/providers/inject-destroy.provider';

@Component({
  selector: 'be-atom-error-text',
  templateUrl: './atom-error-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgClass, AsyncPipe],
})
export class AtomErrorTextComponent implements OnInit, OnDestroy {
  classes = input<string>('textbox__error-msg');

  message$ = new BehaviorSubject('');

  private errors = inject(FORM_ERRORS);
  private subscription: Subscription;
  private ngControl = inject(NgControl);
  private translocoService = inject(TranslocoService);
  private destroy$ = injectDestroy();
  private latestErrorMessage: ValidationErrorMessage;

  ngOnInit(): void {
    if (this.ngControl) {
      const control = this.ngControl.control;

      if (control) {
        this.subscription = control.events.subscribe(() => {
          const controlErrors = control.errors;

          if (controlErrors && control.touched) {
            const firstKey = Object.keys(controlErrors)[0];
            const getError = this.errors[firstKey];
            if (!getError) {
              console.error(`Form error not found for key ${firstKey}`);
              return;
            }
            const text = getError(controlErrors[firstKey]);

            this.setError(text);
          } else if (this.latestErrorMessage !== '') {
            this.setError('');
          }
        });

        this.listenLanguageChange();
      } else {
        console.error('FormControl not found');
      }
    } else {
      console.error('be-atom-error-text must be used with ngModel, formControlName or formControl');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private setError(error: ValidationErrorMessage) {
    this.latestErrorMessage = error;
    const message = this.translateError(error);
    this.message$.next(message);
  }

  private listenLanguageChange(): void {
    this.translocoService.langChanges$
      .pipe(
        takeUntil(this.destroy$),
        filter(() => !!this.latestErrorMessage),
        switchMap((language) => this.translocoService.load(language)),
      )
      .subscribe(() => {
        if (this.latestErrorMessage) {
          const error = this.translateError(this.latestErrorMessage);
          this.message$.next(error);
        }
      });
  }

  private translateError(error: ValidationErrorMessage): string {
    if (typeof error === 'object') {
      return this.translocoService.translate(error.key, error.params);
    }
    return this.translocoService.translate(error);
  }
}
