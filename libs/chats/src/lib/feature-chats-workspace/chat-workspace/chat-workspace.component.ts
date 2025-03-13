import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatsService } from '@tt/chats';
import { filter, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace',
  standalone: true,
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceMessagesWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatsService = inject(ChatsService);

  activeChat$ = this.route.params
    .pipe(
      switchMap(({ id }) => {
        if(id === 'new') {
          return this.route.queryParams.pipe(
            filter(({userId}) => userId),
            switchMap(({userId}) => {
              return this.chatsService.createChat(userId)
                .pipe(
                  switchMap(chat => {
                    this.router.navigate(['chats', chat])
                    return of(null)
                  })
                )
            })
          )
        }

        // localStorage.setItem('lastActiveChat', id);

        return this.chatsService.getChatById(id
          // localStorage.getItem('lastActiveChat') || id
        );
      }
    )
  );
}
