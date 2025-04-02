import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { accessGuard, LoginPageComponent } from '@tt/auth';
import { chatsRoutes } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';
import {
  ProfilePageComponent,
  SettingsPageComponent,
  SearchPageComponent,
  profileFeature,
  ProfileEffects
} from '@tt/profile';
import { postsFeature, PostsEffects } from '@tt/posts';

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
        providers: [
          provideState(postsFeature),
          provideEffects(PostsEffects)
        ]
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
      },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
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
