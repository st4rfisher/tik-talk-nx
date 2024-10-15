import { Profile } from '@/model/profile';
import { Component, Input } from '@angular/core';
import { ImageUrlPipe } from '@/helpers/pipes/image-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [
    ImageUrlPipe
  ],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})

export class SubscriberCardComponent {
  @Input() profile!: Profile
}
