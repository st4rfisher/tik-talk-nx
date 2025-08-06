import { profileActions, ProfileService } from '@tt/profile';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, startWith, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent implements OnDestroy {
  store = inject(Store)
  formBuilder = inject(FormBuilder)
  searchForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });
  // searchFormSubscription!: Subscription;

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
      )
      .subscribe(formValue => {
        return this.store.dispatch(profileActions.filterEvent({ filters: formValue }))
      });
  }

  ngOnDestroy(): void {
    // this.searchFormSubscription.unsubscribe()
  }
}
