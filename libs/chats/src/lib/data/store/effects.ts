import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ChatsService } from '../services/chats.service';
import { chatsActions } from './actions';

@Injectable({
  providedIn: 'root'
})

export class ChatsEffects {
  chatsService = inject(ChatsService);
  actions$ = inject(Actions)

  fetchChats = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.fetchMyChats),
      switchMap(() => {
        return this.chatsService.getMyChats()
      }),
      map(response => {
        // console.log(response)
        return chatsActions.chatsLoaded({chats: response})
      })
    )
  })

  createActiveChat = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.createActiveChat),
      switchMap(({userId}) => {
        console.log('Создание чата с: ', userId)
        return this.chatsService.createChat(userId)
      }),
      map(response => {
        // console.log(response)
        return chatsActions.activeChatCreated({chat: response})
      })
    )
  })

  fetchActiveChat = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatsActions.fetchActiveChat),
      switchMap(({chatId}) => {
        return this.chatsService.getChatById(chatId)
      }),
      map(response => {
        // console.log(response)
        return chatsActions.activeChatLoaded({chat: response})
      })
    )
  })
}
