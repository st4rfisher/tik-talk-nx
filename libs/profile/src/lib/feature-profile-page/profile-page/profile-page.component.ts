import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../ui';
import { profileActions, selectCurrentProfile, selectMyProfile, selectMyProfileSubscribersList } from '../../data';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { IconComponent, ImageUrlPipe } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    ProfileHeaderComponent,
    IconComponent,
    AsyncPipe,
    ImageUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})

export class ProfilePageComponent {
  store = inject(Store);
  route = inject(ActivatedRoute);
  router = inject(Router);
  subscribers$ = this.store.select(selectMyProfileSubscribersList)
  subscribersCount$ = this.subscribers$.pipe(map(subscribers => subscribers?.length ?? 0));
  myProfile = this.store.selectSignal(selectMyProfile)
  id = toSignal(this.route.params.pipe(map(parameters => parameters['id'])), { initialValue: '' });
  isMyPage = computed(() => {
    return this.id() === 'me' || this.id() === this.myProfile()?.id;
  });

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if (id === 'me') return this.store.select(selectMyProfile);

        this.store.dispatch(profileActions.getCurrentProfile({id: id}))
        return this.store.select(selectCurrentProfile)
      })
    );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], {queryParams: { userId }});
  }

  ngOnInit(): void {
    this.store.dispatch(profileActions.getMyProfileSubscribersList({limit: 5}))
  }
}
