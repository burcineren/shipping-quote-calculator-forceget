import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoginAction, Logout, RegisterAction } from './auth.actions';
import { catchError, tap } from 'rxjs/operators';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';
import { AuthService } from '@beng-core/services/auth.service';
import { LocalStorageService } from '@beng-core/services/local-storage.service';
import { AuthStateModel } from './auth-state.type';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    isAuthenticated: false,
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static getToken(state: AuthStateModel): string | null {
    return state.token;
  }

  @Action(RegisterAction)
  register(ctx: StateContext<AuthStateModel>, action: RegisterAction) {
    const { email, password, confirmPassword } = action.payload;

    return this.authService.register(email, password, confirmPassword).pipe(
      tap((response) => {
        const newState: AuthStateModel = {
          token: response.token,
          isAuthenticated: true,
        };
        ctx.patchState(newState);

        // LocalStorage'da kaydet
        this.localStorageService.set(LocalStorageKeysEnum.AUTH_STATE, newState);
      })
    );
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    const { email, password } = action.payload;

    return this.authService.login(email, password).pipe(
      tap((response) => {
        const newState: AuthStateModel = {
          token: response.token,
          isAuthenticated: true,
        };
        ctx.patchState(newState);

        // LocalStorage'da kaydet
        this.localStorageService.set(LocalStorageKeysEnum.AUTH_STATE, newState);
      })
    );
  }
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        const defaultState: AuthStateModel = {
          token: null,
          isAuthenticated: false,
        };

        ctx.setState(defaultState);

        this.localStorageService.remove(LocalStorageKeysEnum.AUTH_STATE);


      }),
      catchError((error) => {
        console.error('Logout failed:', error);

        const defaultState: AuthStateModel = {
          token: null,
          isAuthenticated: false,
        };
        ctx.setState(defaultState);

        this.localStorageService.remove(LocalStorageKeysEnum.AUTH_STATE);


        return throwError(() => new Error('Logout failed'));
      })
    );
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>) {
    const savedState = this.localStorageService.get<AuthStateModel>(LocalStorageKeysEnum.AUTH_STATE);

    if (this.isValidAuthState(savedState)) {
      ctx.setState(savedState);
    } else {
      console.warn('Invalid saved state found in LocalStorage');
    }
  }

  private isValidAuthState(state: any): state is AuthStateModel {
    return state && typeof state.token === 'string' && typeof state.isAuthenticated === 'boolean';
  }
}