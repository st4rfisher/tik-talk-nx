import { createFeature, createReducer, on } from "@ngrx/store";
import { Chat, LastMessageResponse } from '../../data';
import { chatsActions } from "./actions";

export interface ChatsState {
  chatsList: LastMessageResponse[],
  chats: Chat[]
}

export const chatsState: ChatsState = {
  chatsList: [],
  chats: []
}

export const chatsFeature = createFeature({
  name: 'chatsFeature',
  reducer: createReducer(
    chatsState,

    on(chatsActions.chatsLoaded, (state, payload) => {
      // console.log(payload.chats)
      return {
        ...state,
        chatsList: payload.chats
      }
    }),
  )
})
