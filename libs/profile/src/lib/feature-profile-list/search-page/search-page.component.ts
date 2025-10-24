import { Component, effect, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { profileActions, selectFilteredProfiles } from '../../data';
import { Store } from '@ngrx/store';
// import { InfiniteScrollTriggerComponent } from '@tt/common-ui';
import { WaIntersectionObservee, WaIntersectionObserverDirective } from '@ng-web-apis/intersection-observer';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, filter, of, startWith, switchMap, take } from 'rxjs';
// import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    // InfiniteScrollTriggerComponent,
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
    AsyncPipe
    // InfiniteScrollDirective
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})

export class SearchPageComponent {
  router = inject(Router);
  store = inject(Store)
  profiles$ = this.store.select(selectFilteredProfiles) .pipe(
    filter(profiles => !!profiles && profiles.length > 0),
  );
  isInitialLoading$ = new BehaviorSubject<boolean>(true)
  isScrollLoading$ = new BehaviorSubject<boolean>(false)


  fetchItems() {
    this.store.dispatch(profileActions.setPage({}))
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if(!entries.length) return

    if(entries[0].intersectionRatio > 0) {
      this.isScrollLoading$.next(true)
      this.fetchItems()
    }
  }

  ngOnInit(): void {
    this.isInitialLoading$.next(true)
    this.profiles$
    .pipe(
      filter(profiles => !!profiles && profiles.length > 0),
    )
    .subscribe(
      () => {
        this.isScrollLoading$.next(false)
        this.isInitialLoading$.next(false)
      }
    )
  }
}
