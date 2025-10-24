import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { chatsActions, selectActiveChat } from '@tt/chats';
import { filter, map, switchMap, take, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

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
  store = inject(Store)
  route = inject(ActivatedRoute);
  router = inject(Router);
  actions$ = inject(Actions)
  activeChat$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if(id === 'new') {
          return this.route.queryParams.pipe(
            filter(({userId}) => !!userId),
            tap(({userId}) => this.store.dispatch(chatsActions.createActiveChat({userId: userId}))),
            switchMap(() =>
              this.actions$.pipe(
                ofType(chatsActions.activeChatCreated),
                take(1),
                tap(({ chat }) => this.router.navigate(['chats', chat.id])),
                map(({ chat }) => chat)
              )
            )
          )
        }

        this.store.dispatch(chatsActions.fetchActiveChat({chatId: id}))
        return this.store.select(selectActiveChat).pipe(
          filter(chat=> !!chat)
        );
      }
    ));
}
