import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileHeaderComponent } from '@/components/profile-header/profile-header.component';
import { ProfileService } from '@/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Profile } from '@/model/profile';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { IconComponent } from '@/common-ui/icon/icon.component';
// import { SubscriberItemComponent } from "../../components/sidebar/subscriber-item/subscriber-item.component";
import { ImageUrlPipe } from '@/helpers/pipes/image-url.pipe';
import { PostFeedComponent } from "./post-feed/post-feed.component";

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
    PostFeedComponent
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})

export class ProfileComponent {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)
  myProfile$ = toObservable(this.profileService.myProfile)
  subscribers$ = this.profileService.getSubscribersShortList(5)
  subscribersCount!: number

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if(id === 'me') return this.myProfile$
        return this.profileService.getAccount(id)
      })
    )

  ngOnInit(): void {
    this.subscribers$.subscribe(
      response => this.subscribersCount = response.length
    )
  }
}
