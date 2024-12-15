import { Profile } from '@/model/profile';
import { Component, input } from '@angular/core';
import { ImageUrlPipe } from '@/helpers/pipes/image-url.pipe';
import { AvatarComponent } from "../../common-ui/avatar/avatar.component";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    AvatarComponent
],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})

export class ProfileHeaderComponent {
  profile = input<Profile>()
}
