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
        redirectTo: String(localStorage.getItem('lastActiveChat')),
        pathMatch: 'full',
      },
      {
        path: ':id',
        component: ChatWorkspaceComponent,
      },
    ],
  },
];
