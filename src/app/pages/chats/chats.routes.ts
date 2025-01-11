import { Route } from "@angular/router";
import { ChatsComponent } from "./chats.component";
import { ChatWorkspaceComponent } from "./chat-workspace/chat-workspace.component";

export const chatsRoutes: Route[] = [
  {
    path:'',
    component: ChatsComponent,
    children: [
      {
        path: '',
        redirectTo: String(localStorage.getItem('lastActiveChat')),
        pathMatch: 'full'
      },
      {
        path:':id',
        component: ChatWorkspaceComponent
      }
    ]
  }
]
