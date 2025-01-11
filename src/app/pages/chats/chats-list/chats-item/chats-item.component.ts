import { Component, input } from '@angular/core';
import { AvatarComponent } from '@/common-ui/avatar/avatar.component';
import { LastMessageResponse } from '@/model/chats.interface';

@Component({
  selector: 'button[chats-item]',
  standalone: true,
  imports: [
    AvatarComponent
  ],
  templateUrl: './chats-item.component.html',
  styleUrl: './chats-item.component.scss'
})

export class ChatsItemComponent {
  chat = input<LastMessageResponse>()
}
