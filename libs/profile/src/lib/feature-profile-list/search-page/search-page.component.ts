import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { profileActions, selectFilteredProfiles } from '../../data';
import { Store } from '@ngrx/store';
// import { InfiniteScrollTriggerComponent } from '@tt/common-ui';
import { WaIntersectionObservee, WaIntersectionObserverDirective } from '@ng-web-apis/intersection-observer';
// import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    // InfiniteScrollTriggerComponent,
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
    // InfiniteScrollDirective
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})

export class SearchPageComponent {
  store = inject(Store)
  profiles = this.store.selectSignal(selectFilteredProfiles);

  fetchItems() {
    this.store.dispatch(profileActions.setPage({}))
  }

  onScroll() {
    this.fetchItems()
  }

  onIntersection(entries: IntersectionObserverEntry[]) {
    if(!entries.length) return

    if(entries[0].intersectionRatio > 0) {
      this.fetchItems()
    }
  }
}
