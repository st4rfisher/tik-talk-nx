import { BASE_API_URL } from "@/global/variables";
import { Chat, Message, LastMessageResponse } from "@/model/chats.interface";
import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { ProfileService } from "./profile.service";
import { catchError, map, tap } from "rxjs";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  http = inject(HttpClient)
  errorService = inject(ErrorService)
  myProfile = inject(ProfileService).myProfile
  activeChatMessages = signal<Message[]>([])

  createChat(userId: number) {
    return this.http.post<Chat>(`${BASE_API_URL}/chat/${userId}`, {})
  }

  getMyChats() {
    return this.http.get<LastMessageResponse[]>(`${BASE_API_URL}/chat/get_my_chats/`)
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${BASE_API_URL}/chat/${chatId}`)
      .pipe(
        map(chat => {
          //преобразовываем каждое сообщение в чате необходимыми параметрами
          const patchedMessages = chat.messages.map(
            (message: Message) => {
              return {
                ...message,
                user: chat.userFirst.id === message.userFromId ? chat.userFirst : chat.userSecond,
                isMine: message.userFromId === this.myProfile()!.id
              }
            }
          )

          this.activeChatMessages.set(patchedMessages)

          //преобразовываем каждый чат необходимыми параметрами
          return {
            ...chat,
            companion: chat.userFirst.id === this.myProfile()!.id ? chat.userSecond : chat.userFirst,
            messages: patchedMessages
          }
        })
      )
  }

  sendMessage(chatId: number, message: string) {
    console.log(chatId, message)
    return this.http.post(`${BASE_API_URL}/message/send/${chatId}`, {}, {
      params: {
        message
      }
    })
  }
}
