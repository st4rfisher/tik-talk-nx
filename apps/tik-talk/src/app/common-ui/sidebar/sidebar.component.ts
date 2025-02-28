import { Component, inject } from '@angular/core';
import { IconComponent, ImageUrlPipe } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileService } from '@tt/profile';
import { firstValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    IconComponent,
    RouterLinkActive,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    ImageUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  myProfile = this.profileService.myProfile;
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: '/chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];

  ngOnInit(): void {
    firstValueFrom(this.profileService.getMyAccount());
  }
}
