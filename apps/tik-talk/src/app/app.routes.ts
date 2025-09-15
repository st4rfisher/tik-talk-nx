import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import {
  // AuthEffects,
  // authFeature,
  accessGuard,
  LoginPageComponent
} from '@tt/auth';
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
import { chatsFeature, ChatsEffects } from '@tt/chats';

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
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ]
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),

          provideState(postsFeature),
          provideEffects(PostsEffects),

          // provideState(authFeature),
          // provideEffects(AuthEffects),
        ]
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ]
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
    component: LoginPageComponent,
    // providers: [
    //   provideState(authFeature),
    //   provideEffects(AuthEffects),
    // ]
  },
];
