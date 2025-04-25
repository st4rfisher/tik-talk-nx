import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Profile } from "@tt/interfaces/profile";

export const profileActions = createActionGroup({
  source: 'profile',
  events: {
    'filter events': props<{filters: Record<string, any>}>(),
    'profiles loaded': props<{profiles: Profile[]}>(),

    'get current profile': props<{id: string}>(),
    'current profile loaded': props<{profile: Profile}>(),

    'get my profile': emptyProps,
    'my profile loaded': props<{profile: Profile}>(),

    'get my subscribers short list': props<{limit?: number}>(),
    'my subscribers short list loaded': props<{profiles: Profile[]}>(),

    'get my profile subscribers list': props<{limit?: number}>(),
    'my profile subscribers list loaded': props<{profiles: Profile[]}>(),

    'uploadAvatar': props<{avatar: File}>(),
    'avatarUploaded': props<{profile: Profile}>(),

    'patchProfileData': props<{data: Partial<Profile>}>(),
    'profileDataPatched': props<{profile: Profile}>(),
  }
})
