import { createSelector } from "@ngrx/store";
import { chatsFeature } from "./reducer";

export const selectChats = createSelector(
  chatsFeature.selectChatsList,
  (chats) => chats
)

export const selectActiveChat = createSelector(
  chatsFeature.selectActiveChat,
  (chat) => chat
)

