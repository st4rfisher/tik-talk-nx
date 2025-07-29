import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Chat, LastMessageResponse } from "../interfaces/chats.interface";

export const chatsQueryActions = createActionGroup({
  source: 'chats',
  events: {
    'fetch my chats': emptyProps(),
    'create active chat': props<{id: number}>(),
    'fetch active chat': props<{id: number}>(),
  }
})

export const chatsResponseActions = createActionGroup({
  source: 'chats',
  events: {
    'chats loaded': props<{chats: LastMessageResponse[]}>(),
    'active chat created': props<{chat: Chat}>(),
    'active chat loaded': props<{chat: Chat}>(),
  }
})
