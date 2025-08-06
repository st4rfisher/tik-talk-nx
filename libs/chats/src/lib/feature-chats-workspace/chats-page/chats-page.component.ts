import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ChatsService } from '../../data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
})

export class ChatsPageComponent {
  // #chatsService = inject(ChatsService)

  // constructor() {
  //   //подключение через сокет, основанный на Rxjs
  //   this.#chatsService.connectWSThroughRxjs()
  //   .pipe(takeUntilDestroyed())
  //   .subscribe()
  // }

  // ngOnInit(): void {
  //   // this.#chatsService.connectWS() //подключение через нативный сокет
  // }
}
