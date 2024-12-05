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
    loadChildren: () => import('./pages/offer-page/offer-page.routes').then((m) => m.OfferPageRoutes),
  },
  {
    path: 'offer-list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/offer-list/offer-list.routes').then((m) => m.OfferListRoutes),
  },
  { path: '**', redirectTo: '/' },
];
