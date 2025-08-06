import { createFeature, createReducer, on } from "@ngrx/store";
import { Chat, LastMessageResponse } from '../../data';
import { chatsActions } from "./actions";

export interface ChatsState {
  chatsList: LastMessageResponse[] | null,
  activeChat: Chat | null

  // chats: Chat[]
}

export const chatsState: ChatsState = {
  chatsList: null,
  activeChat: null
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

    on(chatsActions.activeChatCreated, (state, payload) => {
      // console.log(payload.chats)
      return {
        ...state,
        activeChat: payload.chat
      }
    }),

    on(chatsActions.activeChatLoaded, (state, payload) => {
      // console.log(payload.chat)
      return {
        ...state,
        activeChat: payload.chat
      }
    }),
  )
})
