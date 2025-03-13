import { Profile } from '@tt/interfaces/profile';
import { Component, input } from '@angular/core';
import { AvatarComponent, ImageUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
}
