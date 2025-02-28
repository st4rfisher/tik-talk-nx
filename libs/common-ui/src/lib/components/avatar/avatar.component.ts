import { Component, Input, input } from '@angular/core';
import { ImageUrlPipe } from '../../pipes';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [ImageUrlPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  url = input<string | null>(null);
  @Input({ required: true }) size!: number;
}
