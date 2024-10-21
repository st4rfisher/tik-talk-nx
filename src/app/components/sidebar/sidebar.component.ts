import { Component, inject } from '@angular/core';
import { IconComponent } from "../../common-ui/icon/icon.component";
import { SubscriberCardComponent } from "./subscriber-card/subscriber-card.component";
import { RouterLink } from '@angular/router';
import { ProfileService } from '@/services/profile.service';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImageUrlPipe } from '@/helpers/pipes/image-url.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    IconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImageUrlPipe
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList()
  myProfile = this.profileService.myProfile
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: '/'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/'
    }
  ]

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMyAccount())
  }
}
