import { ProfileService } from '@/services/profile.service';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Subscription, debounceTime, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})

export class ProfileFiltersComponent {
  profileService = inject(ProfileService)
  formBuilder = inject(FormBuilder)
  searchForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  })
  searchFormSubscription!: Subscription

  constructor() {
    this.searchForm.valueChanges
    .pipe(
      startWith({}),
      debounceTime(300),
      switchMap(formValue => {
        return this.profileService.filterProfiles(formValue)
      })
    )
    .subscribe()
  }

  ngOnDestroy(): void {
    this.searchFormSubscription.unsubscribe()
  }
}
