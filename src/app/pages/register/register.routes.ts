import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register.component';
import { RegisterLayoutComponent } from './components/register-layout/register-layout.component';

export const RegisterRoutes: Routes = [
    {
      path: '',
      component: RegisterLayoutComponent,
      data: {
        title: 'clientRecord',
      },
      children: [
        {
          path: 'register',
          component: RegisterComponent,
        },
      ],
    },
  ];
