import { Component, input } from '@angular/core';
import { AvatarComponent } from '@tt/common-ui';
import { LastMessageResponse } from '@tt/chats';

@Component({
  selector: 'button[chats-item]',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './chats-item.component.html',
  styleUrl: './chats-item.component.scss',
})
export class ChatsItemComponent {
  chat = input<LastMessageResponse>();
}
