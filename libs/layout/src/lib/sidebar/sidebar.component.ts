import { Component, inject } from '@angular/core';
import { IconComponent, ImageUrlPipe } from '@tt/common-ui';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { profileActions, selectMyProfile, selectMySubscribersShortList } from '@tt/profile';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { AuthService } from '@tt/auth';
import { SkeletonListComponent, SkeletonComponent } from "@tt/common-ui";

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
    SkeletonListComponent,
    SkeletonComponent
],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})

export class SidebarComponent {
  store = inject(Store)
  authService = inject(AuthService)
  subscribers$ = this.store.select(selectMySubscribersShortList)
  myProfile = this.store.selectSignal(selectMyProfile)
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

  logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.store.dispatch(profileActions.getMyProfile())
    this.store.dispatch(profileActions.getMySubscribersShortList({}))
  }
}
