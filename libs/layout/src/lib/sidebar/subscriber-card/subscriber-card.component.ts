import { Profile } from '@tt/interfaces/profile';
import { Component, Input } from '@angular/core';
import { ImageUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [ImageUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
