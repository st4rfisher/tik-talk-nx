import { Routes } from '@angular/router';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { accessGuard } from './guards/access.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { chatsRoutes } from './pages/chats/chats.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [accessGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile/me',
        pathMatch: 'full'
      },
      {
        path: 'profile/:id',
        component: ProfileComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'chats',
        loadChildren: () => chatsRoutes
      },
    ],

  },
  {
    path: 'login',
    component: LoginComponent
  },
];
