import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Chat, LastMessageResponse } from "../interfaces/chats.interface";

export const chatsActions = createActionGroup({
  source: 'chats',
  events: {
    'fetch my chats': emptyProps(),
    'chats loaded': props<{chats: LastMessageResponse[]}>(),
  }
})
