import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { ProfileService } from '../../data';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;
}
