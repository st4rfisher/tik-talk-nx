import { Message } from '@/model/chats.interface';
import { Component, HostBinding, input } from '@angular/core';
import { AvatarComponent } from "../../../../../common-ui/avatar/avatar.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-workspace-message',
  standalone: true,
  imports: [
    AvatarComponent,
    DatePipe
  ],
  templateUrl: './chat-workspace-message.component.html',
  styleUrl: './chat-workspace-message.component.scss'
})

export class ChatWorkspaceMessageComponent {
  message = input.required<Message>()

  @HostBinding('class.is-mine-message')
  get isMine() {
    return this.message().isMine
  }
}
