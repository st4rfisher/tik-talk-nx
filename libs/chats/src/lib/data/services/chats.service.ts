import { BASE_API_URL } from 'global/variables';
import { Chat, Message, LastMessageResponse } from '../interfaces/chats.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMyProfile } from '@tt/profile';
import { AuthService } from '@tt/auth';
import { Observable, map } from 'rxjs';
import { ChatWSService } from '../interfaces/chat-ws-service.interface';
import { ChatWSNativeService } from './chat-ws-native.service';
import { ChatWSMessage } from '../interfaces/chat-ws-message.interface';
import { isNewMessage, isUnreadMessage } from '../interfaces/type-guards';
import { ChatWSRxjsService } from './chat-ws-rxjs.service';

@Injectable({
  providedIn: 'root',
})

export class ChatsService {
  store = inject(Store)
  http = inject(HttpClient)
  authService = inject(AuthService)
  myProfile = this.store.selectSignal(selectMyProfile)
  activeChatMessages = signal<Message[]>([])
  // wsAdapter: ChatWSService = new ChatWSNativeService() //нативный сокет
  wsAdapter: ChatWSService = new ChatWSRxjsService() //сокет, основанный на Rxjs

  //подключение через нативный сокет
  connectWS() {
    this.wsAdapter.connent({
      url: `${BASE_API_URL}/chat/ws`,
      token: this.authService.token ?? '',
      handleMessage: this.handleWSMessage //или this.handleWSMessage.bind(this), но без стрелочной функции для this.handleWSMessage, для создания контекста this
    })
  }

  //подключение через сокет, основанный на Rxjs
  connectWSThroughRxjs() {
    return this.wsAdapter.connent({
      url: `${BASE_API_URL}/chat/ws`,
      token: this.authService.token ?? '',
      handleMessage: this.handleWSMessage //или this.handleWSMessage.bind(this), но без стрелочной функции для this.handleWSMessage, для создания контекста this
    }) as Observable<ChatWSMessage>
  }

  //используется стрелочная функция, чтобы создать контекст this (замыкание)
  handleWSMessage = (message: ChatWSMessage) => {
    console.log(message)
    if(!('action' in message)) return

    if(isUnreadMessage(message)) {
     //сделать счетчик непрочитанных сообщений
    }

    if(isNewMessage(message)) {
      this.activeChatMessages.set([
        ...this.activeChatMessages(),
        {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: false,
          isMine: false
        }
      ])
    }
  }

  createChat(userId: number) {
    return this.http.post<Chat>(`${BASE_API_URL}/chat/${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageResponse[]>(
      `${BASE_API_URL}/chat/get_my_chats/`
    );
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${BASE_API_URL}/chat/${chatId}`).pipe(
      map((chat) => {
        //преобразовываем каждое сообщение в чате необходимыми параметрами
        const patchedMessages = chat.messages.map((message: Message) => {
          return {
            ...message,
            user:
              chat.userFirst.id === message.userFromId
                ? chat.userFirst
                : chat.userSecond,
            isMine: message.userFromId === this.myProfile()!.id,
          };
        });

        this.activeChatMessages.set(patchedMessages);

        //преобразовываем каждый чат необходимыми параметрами
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.myProfile()!.id
              ? chat.userSecond
              : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    console.log(chatId, message);
    return this.http.post(
      `${BASE_API_URL}/message/send/${chatId}`,
      {},
      {
        params: {
          message,
        },
      }
    );
  }
}
