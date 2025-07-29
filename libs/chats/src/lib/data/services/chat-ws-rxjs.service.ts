import { Observable, finalize, tap } from "rxjs"
import { ChatWSMessage } from "../interfaces/chat-ws-message.interface"
import { ChatConnectionWSParams, ChatWSService } from "../interfaces/chat-ws-service.interface"
import { WebSocketSubject } from "rxjs/internal/observable/dom/WebSocketSubject"
import { webSocket } from "rxjs/webSocket"

export class ChatWSRxjsService implements ChatWSService {
  #socket: WebSocketSubject<ChatWSMessage> | null = null

  connent(params: ChatConnectionWSParams): Observable<ChatWSMessage> {
    if(!this.#socket){
      this.#socket = webSocket({
        url: params.url,
        protocol: [params.token]
      })
    }

    return this.#socket.asObservable()
      .pipe(
        tap(message => params.handleMessage(message)),
        finalize(() => console.log('WebSocket closed'))
      )
  }

  sendMessage(text: string, chatID: number) {
    this.#socket?.next({
      text,
      chat_id: chatID
    })
  }

  disconnent() {
    this.#socket?.complete()
  }
}
