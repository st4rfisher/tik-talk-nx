import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProfileCardComponent } from '@/components/common-ui/profile-card/profile-card.component';
import { ProfileService } from '@/services/profile.service';
import { Profile } from '@/model/profile';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProfileCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'tik-talk';
  profiles: Profile[] = []

  constructor(private profileService: ProfileService) {
    this.profileService.getTestAccounts().subscribe((response: any) => {
      this.profiles = response
      console.log(response)
    })
  }
}
