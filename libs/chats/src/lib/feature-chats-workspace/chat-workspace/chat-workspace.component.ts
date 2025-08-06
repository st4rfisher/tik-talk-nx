import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceMessagesWrapperComponent } from './chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { chatsActions, selectActiveChat } from '@tt/chats';
import { filter, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';

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

  activeChat$ = this.route.params
    .pipe(
      switchMap(({ id }) => {
        console.log(id)
        if(id === 'new') {
          return this.route.queryParams.pipe(
            filter(({userId}) => userId),
            switchMap(({userId}) => {
              this.store.dispatch(chatsActions.createActiveChat(userId))

              return this.store.select(selectActiveChat).pipe(
                switchMap(chat => {
                  this.router.navigate(['chats', chat])
                  return of(null)
                })
              )
            })
          )
        }

        this.store.dispatch(chatsActions.fetchActiveChat({id}))
        return this.store.select(selectActiveChat)
      }
    )
  );
}
