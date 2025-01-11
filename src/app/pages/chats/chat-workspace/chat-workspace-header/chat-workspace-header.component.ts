import { Profile } from '@/model/profile';
import { Component, input } from '@angular/core';
import { AvatarComponent } from "../../../../common-ui/avatar/avatar.component";

@Component({
  selector: 'app-chat-workspace-header',
  standalone: true,
  imports: [
    AvatarComponent
  ],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss'
})

export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>()
}
