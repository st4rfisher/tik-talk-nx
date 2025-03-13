import { Routes } from '@angular/router';
import { accessGuard, LoginPageComponent } from '@tt/auth';
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';
import { ProfilePageComponent, SettingsPageComponent, SearchPageComponent } from '@tt/profile';

export const routes: Routes = [
  {
    path: '',
    canActivate: [accessGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile/me',
        pathMatch: 'full',
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes,
      },
    ],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];
