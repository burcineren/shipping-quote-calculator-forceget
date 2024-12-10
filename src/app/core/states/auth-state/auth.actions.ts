export class LoginAction {
  static readonly type = '[Auth] Login';
  constructor(public payload: { email: string; password: string }) { }
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
export class RegisterAction {
  static readonly type = '[Auth] Register';
  constructor(public payload: { email: string; password: string; confirmPassword: string }) { }
}