import { Observable } from "rxjs";
import { ChatWSMessage } from "./chat-ws-message.interface";

export interface ChatConnectionWSParams {
  url: string,
  token: string,
  handleMessage: (message: ChatWSMessage) => void
}

export interface ChatWSService {
  connent: (params: ChatConnectionWSParams) => void | Observable<ChatWSMessage>,
  sendMessage: (text: string, chatID: number) => void,
  disconnent: () => void,
}
