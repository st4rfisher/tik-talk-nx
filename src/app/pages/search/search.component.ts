import { Component, inject } from '@angular/core';
import { ProfileService } from '@/services/profile.service';
import { Profile } from '@/model/profile';
import { ProfileCardComponent } from '@/components/profile-card/profile-card.component';
import { ProfileFiltersComponent } from "./profile-filters/profile-filters.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent
],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})

export class SearchComponent {
  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles
}
