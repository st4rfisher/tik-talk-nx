import { Component, Input } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';
import { ImageUrlPipe } from '@tt/common-ui';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [
    ImageUrlPipe,
    RouterLink
  ],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Profile;

  constructor() {}
}
