import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../ui';
import { ProfileService } from '../../data';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { IconComponent, ImageUrlPipe } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    RouterLink,
    ProfileHeaderComponent,
    IconComponent,
    AsyncPipe,
    // SubscriberItemComponent,
    ImageUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  myProfile$ = toObservable(this.profileService.myProfile);
  subscribers$ = this.profileService.getSubscribersShortList(5);
  subscribersCount!: number;
  isMyPage = signal(false);
  profile$ = this.route.params
    .pipe(
      switchMap(({ id }) => {
        this.isMyPage.set(
          id === 'me' || id === this.profileService.myProfile()?.id
        );
        if (id === 'me') return this.myProfile$;
        return this.profileService.getAccount(id);
      })
    );

  async sendMessage(userId: number) {
    this.router.navigate(['/chats', 'new'], {queryParams: { userId }});
  }

  ngOnInit(): void {
    this.subscribers$.subscribe(
      (response) => (this.subscribersCount = response.length)
    );
  }
}
