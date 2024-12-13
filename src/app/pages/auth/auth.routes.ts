import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/logout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    data: {
      title: 'clientRecord',
    },
    children: [{ path: 'login', component: LoginComponent }, { path: 'register', component: RegisterComponent }],
  },
];
