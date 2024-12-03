import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';

export const AuthRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    data: {
      title: 'clientRecord',
    },
    children: [{ path: 'login', component: LoginComponent }],
  },
];
