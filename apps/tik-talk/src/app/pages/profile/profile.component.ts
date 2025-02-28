import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '@tt/profile';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { IconComponent, ImageUrlPipe } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { ChatsService } from '../../data/services/chats.service';

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
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileService = inject(ProfileService);
  chatsService = inject(ChatsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  myProfile$ = toObservable(this.profileService.myProfile);
  subscribers$ = this.profileService.getSubscribersShortList(5);
  subscribersCount!: number;
  isMyPage = signal(false);
  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyPage.set(
        id === 'me' || id === this.profileService.myProfile()?.id
      );
      if (id === 'me') return this.myProfile$;
      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    firstValueFrom(this.chatsService.createChat(userId)).then((response) => {
      this.router.navigate(['/chats', response.id]);
    });
  }

  ngOnInit(): void {
    this.subscribers$.subscribe(
      (response) => (this.subscribersCount = response.length)
    );
  }
}
