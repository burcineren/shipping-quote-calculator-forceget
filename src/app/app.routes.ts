import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.AuthRoutes),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.routes').then((m) => m.HomeRoutes),
  },
];
