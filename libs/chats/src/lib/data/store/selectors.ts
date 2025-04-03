import { createSelector } from "@ngrx/store";
import { chatsFeature } from "./reducer";

export const selectChats = createSelector(
  chatsFeature.selectChatsList,
  (chats) => {
    return chats;
  }
)
