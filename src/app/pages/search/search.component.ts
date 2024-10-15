import { Component } from '@angular/core';
import { ProfileService } from '@/services/profile.service';
import { Profile } from '@/model/profile';
import { ProfileCardComponent } from '@/components/profile-card/profile-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ProfileCardComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  profiles: Profile[] = []

  constructor(private profileService: ProfileService) {
    this.profileService.getTestAccounts().subscribe((response: any) => {
      this.profiles = response
      // console.log(response)
    })
  }
}
