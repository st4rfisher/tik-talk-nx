import { Component, Input } from '@angular/core';
import { Profile } from '@tt/profile';
import { ImageUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImageUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;

  constructor() {}
}
