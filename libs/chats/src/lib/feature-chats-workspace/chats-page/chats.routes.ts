import { Route } from '@angular/router';
import { ChatsPageComponent } from './chats-page.component';
import { ChatWorkspaceComponent } from '../chat-workspace/chat-workspace.component';

export const chatsRoutes: Route[] = [
  {
    path: '',
    component: ChatsPageComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: ':id',
        loadComponent: () => import('../chat-workspace/chat-workspace.component')
          .then(component => component.ChatWorkspaceComponent)
      },
    ],
  },
];
