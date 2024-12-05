import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  forwardRef,
  inject,
  Injector,
  input,
  model,
  OnChanges,
  output,
  signal,
  SimpleChanges,

} from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { nanoid } from 'nanoid';
import { InputMaskOptions } from '@beng-core/types/input-mask';
import { getFormControlTouchedChanges$ } from '@beng-core/utils/form.utils';
import { AtomButtonComponent } from '@beng-core/components/atom-button';
import { AsyncPipe, NgClass } from '@angular/common';
import { IMaskModule } from 'angular-imask';
import { AtomIconCheckCircleComponent } from '@beng-core/components/svg-icons/atom-icon-check-circle';
import { AtomIconAlertCircleComponent } from '@beng-core/components/svg-icons/atom-icon-alert-circle';
import { AtomIconLoaderComponent } from '@beng-core/icons/atom-icon-loader';
import { Observable, takeUntil } from 'rxjs';
import { AtomErrorTextComponent } from '@beng-core/components/atom-error-text';
import { injectDestroy } from '@beng-core/providers/inject-destroy.provider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

type InputType = 'email' | 'number' | 'text' | 'password';

@Component({
  selector: 'be-atom-textbox',
  templateUrl: './atom-textbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtomTextboxComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    AsyncPipe,
    AtomErrorTextComponent,
    AtomIconAlertCircleComponent,
    AtomIconCheckCircleComponent,
    AtomIconLoaderComponent,
    FormsModule,
    IMaskModule,
    NgClass,
    NzInputModule,
    NzIconModule,
    NzButtonModule
  ],
})
export class AtomTextboxComponent implements ControlValueAccessor, AfterViewInit, AfterContentInit, OnChanges {
  rightSectionButton = contentChild(AtomButtonComponent);

  inputId = input<string>(nanoid());

  type = input<InputType>('text');

  label = input<string>();

  placeholder = input('');

  descriptionText = input<string>();

  optionalText = input<string>();

  helperText = input<string>();

  classes = input('');

  inputClasses = input('');

  disabled = input(false);

  loading = input(false);

  readonly = input(false);

  required = input(false);

  minlength = input<number>();

  maxlength = input<number>();

  mask = input<InputMaskOptions>();

  unmask = input<boolean | 'typed'>(true);

  mutableType = signal(this.type());

  mutableDisabled = signal(this.disabled());

  isPasswordInputType = signal(false);

  value = input<string>();

  innerValue = model(this.value());

  showValid = input<boolean>(true);

  showInvalid = input<boolean>(true);

  onBlur = output<void>();

  onFocus = output<void>();

  onTouchedCallback: () => void = () => { };

  computedInputClasses = computed(() => {
    return ['textbox__element', this.inputClasses()].filter(Boolean).join(' ');
  });

  touched$: Observable<boolean>;
  elRef = inject<ElementRef<HTMLElement>>(ElementRef);
  formControl = new FormControl();
  private ngControl: NgControl;
  private onChangeCallback: (_: unknown) => void = () => { };
  private cdRef = inject(ChangeDetectorRef);
  private injector = inject(Injector);
  private destroy$ = injectDestroy();

  constructor() {
    effect(
      () => {
        this.onChangeCallback(this.innerValue());
      },
      { allowSignalWrites: true },
    );
  }

  ngAfterViewInit() {
    this.ngControl = this.injector.get(NgControl, null, {
      self: true,
      optional: true,
    });
    if (!this.ngControl) {
      throw new Error('be-atom-textbox must be used with ngModel, formControlName or formControl');
    }

    this.formControl = this.ngControl.control as FormControl;
    this.touched$ = getFormControlTouchedChanges$(this.formControl);

    this.formControl.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdRef.detectChanges();
    });

    this.updatePasswordInputType();
  }

  ngAfterContentInit() {
    if (this.rightSectionButton()) {
      this.rightSectionButton().mutableClasses.set('text-primary-700 text-sm font-bold underline px-0');
    }
  }

  ngOnChanges({ type }: SimpleChanges): void {
    if (type) {
      console.log(' changes', type);

      this.updatePasswordInputType(type.currentValue);
    }
  }

  writeValue(value: string): void {
    if (value !== this.innerValue()) {
      this.innerValue.set(value);
    }
  }

  registerOnChange(fn: () => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.mutableDisabled.set(isDisabled);
    this.cdRef.markForCheck();
  }

  togglePasswordVisibility(): void {
    this.mutableType.set(this.mutableType() === 'text' ? 'password' : 'text');
  }

  handleBlur(): void {
    this.onTouchedCallback();
    this.onBlur.emit();
  }

  handleFocus(): void {
    this.onFocus.emit();
  }

  private updatePasswordInputType(value?: InputType): void {
    this.mutableType.set(value ?? this.type());
    this.isPasswordInputType.set((value || this.type()) === 'password');
  }
}
