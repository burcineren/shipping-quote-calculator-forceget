import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, Logout, Register } from './auth.actions';
import { tap } from 'rxjs/operators';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';
import { AuthService } from '@beng-core/services/auth.service';
import { LocalStorageService } from '@beng-core/services/local-storage.service';
import { AuthStateModel } from './auth-state.type';

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
    private localStorageService: LocalStorageService
  ) { }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static getToken(state: AuthStateModel): string | null {
    return state.token;
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
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

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
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

        // LocalStorage'dan kaldır
        this.localStorageService.remove(LocalStorageKeysEnum.AUTH_STATE);
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