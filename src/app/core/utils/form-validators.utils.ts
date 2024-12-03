import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { InjectionToken } from '@angular/core';
import { REGEX_EMAIL } from '@beng-core/constants/validators.constant';

export type ValidationErrorMessage =
  | string
  | {
      key: string;
      params: Record<string, string>;
    };

const defaultErrors: Record<string, (params: string & ValidationErrors) => ValidationErrorMessage> = {
  email: (errorMessage: string) => {
    return typeof errorMessage === 'string' ? errorMessage : 'validation.email';
  },
  required: (errorMessage: string) => {
    return typeof errorMessage === 'string' ? errorMessage : 'validation.required';
  },
  patternNotMatch: (errorMessage) => errorMessage,
  minlength: ({ requiredLength, translationKey }) => ({
    key: translationKey ?? 'validation.minLength',
    params: { minlength: requiredLength },
  }),
  maxlength: ({ requiredLength }) => ({
    key: 'validation.maxlength',
    params: { maxlength: requiredLength },
  }),
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});

function isEmptyInputValue(value: unknown): boolean {
  return value == null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
}

function hasValidLength(value: unknown): boolean {
  return value != null && typeof (value as { length?: number }).length === 'number';
}

function requiredValidator(errorMessage: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (isEmptyInputValue(control.value)) {
      return {
        required: errorMessage,
      };
    }
    return null;
  };
}

function regexValidator(control: AbstractControl, regex: RegExp, errorMessage: string): ValidationErrors | null {
  const value = control.value as string;
  if (regex.test(value)) {
    return null;
  }
  return {
    patternNotMatch: errorMessage,
  };
}

function minLengthValidator(minLength: number, translationKey: string) {
  return (control) => {
    if (isEmptyInputValue(control.value) || !hasValidLength(control.value)) {
      return null;
    }
    return control.value.length < minLength
      ? { minlength: { requiredLength: minLength, actualLength: control.value.length, translationKey } }
      : null;
  };
}

export class McValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    return regexValidator(control, REGEX_EMAIL, 'validation.email');
  }

  static required(translationKey: string): ValidatorFn {
    return requiredValidator(translationKey);
  }

  static minLength(minLength: number, translationKey?: string): ValidatorFn {
    return minLengthValidator(minLength, translationKey);
  }
}
