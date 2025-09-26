import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { accessGuard, LoginPageComponent } from '@tt/auth';

import { LayoutComponent } from '@tt/layout';
import {
  // ProfilePageComponent,
  // SettingsPageComponent,
  // SearchPageComponent,
  profileFeature,
  ProfileEffects
} from '@tt/profile';
import { postsFeature, PostsEffects } from '@tt/posts';
import { chatsFeature, ChatsEffects } from '@tt/chats';

export const routes: Routes = [
  {
    path: '',
    canActivate: [accessGuard],
    // component: LayoutComponent,
    loadComponent: () => import('@tt/layout')
      .then(component => component.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'profile/me',
        pathMatch: 'full',
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'profile/:id',
        // component: ProfilePageComponent,
        loadComponent: () => import('@tt/profile')
          .then(component => component.ProfilePageComponent),
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),

          provideState(postsFeature),
          provideEffects(PostsEffects),
        ]
      },
      {
        path: 'settings',
        // component: SettingsPageComponent,
        loadComponent: () => import('@tt/profile')
          .then(component => component.SettingsPageComponent),
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ]
      },
      {
        path: 'search',
        // component: SearchPageComponent,
        loadComponent: () => import('@tt/profile')
          .then(component => component.SearchPageComponent),
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects)
        ]
      },
      {
        path: 'chats',
        // loadChildren: () => chatsRoutes,
        loadChildren: () => import('@tt/chats').then(routes => routes.chatsRoutes),
        providers: [
          provideState(chatsFeature),
          provideEffects(ChatsEffects),

          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ]
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('@tt/auth')
      .then(component => component.LoginPageComponent),
    // component: LoginPageComponent,
  },
];
