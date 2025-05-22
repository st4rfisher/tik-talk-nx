import { Injectable, inject } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectProfileFilters, selectProfilePageable } from './selectors';

@Injectable({
  providedIn: 'root'
})

export class ProfileEffects {
  profileService = inject(ProfileService)
  actions$ = inject(Actions)
  store = inject(Store)

  filterProfilesEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        profileActions.filterEvent,
        profileActions.setPage
      ),
      withLatestFrom(
        this.store.select(selectProfileFilters),
        this.store.select(selectProfilePageable)
      ),
      switchMap(([_, filters, pageable]) => {
        console.log([_, filters, pageable])
        return this.profileService.filterProfiles({
          ...pageable,
          ...filters
        })
      }),
      map(response => profileActions.profilesLoaded({profiles: response.items}))
    )
  })

  getCurrentProfileEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getCurrentProfile),
      switchMap(({id}) => {
        console.log(id)
        return this.profileService.getAccount(id)
      }),
      map(profile => profileActions.currentProfileLoaded({profile: profile}))
    )
  })

  getMyProfileEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getMyProfile),
      switchMap(() => {
        return this.profileService.getMyAccount()
      }),
      map(myAccount => profileActions.myProfileLoaded({profile: myAccount}))
    )
  })

  getMySubscribersShortListEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getMySubscribersShortList),
      switchMap(() => {
        return this.profileService.getSubscribersShortList()
      }),
      map(subscriberAccounts => profileActions.mySubscribersShortListLoaded({profiles: subscriberAccounts}))
    )
  })

  getMyProfileSubscribersListEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.getMyProfileSubscribersList),
      switchMap(({limit}) => {
        return this.profileService.getSubscribersShortList(limit)
      }),
      map(subscriberAccounts => profileActions.myProfileSubscribersListLoaded({profiles: subscriberAccounts}))
    )
  })

  uploadAvatarEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.uploadAvatar),
      switchMap(({avatar}) => {
        return  this.profileService.uploadAvatar(avatar)
      }),
      map(profile => profileActions.avatarUploaded({profile: profile}))
    )
  })

  patchProfileDataEffect = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.patchProfileData),
      switchMap(({data}) => {
        return  this.profileService.patchProfileData(data)
      }),
      map(profile => profileActions.profileDataPatched({profile: profile}))
    )
  })
}
