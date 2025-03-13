import { ProfileService } from '@tt/profile';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent implements OnDestroy {
  profileService = inject(ProfileService);
  formBuilder = inject(FormBuilder);
  searchForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });
  searchFormSubscription!: Subscription;

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap((formValue) => {
          return this.profileService.filterProfiles(formValue);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.searchFormSubscription.unsubscribe()
  }
}
