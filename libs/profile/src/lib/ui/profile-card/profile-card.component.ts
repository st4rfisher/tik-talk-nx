import { Component, Input } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';
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
