import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component'
import { ChatsService } from '@tt/chats';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { environment } from '@tt/environment';
import { AuthService } from '@tt/auth';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})

export class LayoutComponent {
  authService = inject(AuthService)
  #chatsService = inject(ChatsService)
  #store = inject(Store)

  constructor() {
    //подключение через сокет, основанный на Rxjs
    this.#chatsService.connectWSThroughRxjs()
      .pipe(takeUntilDestroyed())
      .subscribe()
  }

  ngOnInit(): void {
    // this.#chatsService.connectWS() //подключение через нативный сокет
    // this.#chatsService.connectWSThroughRxjs().subscribe()
    this.authService.test().subscribe((response) => console.log(response))

  }
}
