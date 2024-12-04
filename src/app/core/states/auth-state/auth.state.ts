import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Login, Logout } from './auth.actions';
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
      })
    );
  }
  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        ctx.setState({
          token: null,
          isAuthenticated: false,
        });
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