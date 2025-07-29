import { Component, inject } from '@angular/core';
import { ChatsItemComponent } from '../chats-item/chats-item.component';
import { chatsQueryActions, selectChats } from '@tt/chats';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { map, startWith, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [
    ChatsItemComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})

export class ChatsListComponent {
  store = inject(Store)
  filterChatsControl = new FormControl('');
  chats$ = this.store.select(selectChats).pipe(
    switchMap((chats) => {
      console.log(chats)
      return this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) => {
          return chats?.filter((chat) => {
            return `${chat.userFrom.lastName} ${chat.userFrom.firstName}`
              .toLowerCase()
              .includes(inputValue?.toLowerCase() as string);
          });
        })
      );
    })
  );

  constructor() {
    // this.store.dispatch(chatsQueryActions.createActiveChat({id: 125}))
    this.store.dispatch(chatsQueryActions.fetchMyChats())
  }
}
