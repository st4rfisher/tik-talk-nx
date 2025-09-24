import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Chat, LastMessageResponse } from "../interfaces/chats.interface";
import { Profile } from "@tt/interfaces/profile";

export const chatsActions = createActionGroup({
  source: 'chats',
  events: {
    'fetch my chats': emptyProps(),
    'chats loaded': props<{chats: LastMessageResponse[]}>(),

    'create active chat': props<{userId: number}>(),
    'active chat created': props<{chat: Chat}>(),

    'fetch active chat': props<{chatId: number}>(),
    'active chat loaded': props<{chat: Chat}>(),

    'set unread messages count': props<{count: number}>(),
  }
})
