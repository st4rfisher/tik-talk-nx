import { createFeature, createReducer, on } from "@ngrx/store";
import { Profile } from "@tt/interfaces/profile";
import { profileActions } from "./actions";

export interface ProfileState {
  myProfile: Profile | null,
  mySubscribersShortList: Profile[] | null,
  myProfileSubscribersList: Profile[] | null,
  currentProfile: Profile | null,
  profiles: Profile[],
  profileFilters: Record<string, any>
}

export const initialState: ProfileState = {
  myProfile: null,
  mySubscribersShortList: null,
  myProfileSubscribersList: null,
  currentProfile: null,
  profiles: [],
  profileFilters: {}
}

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,

    on(profileActions.profilesLoaded, (state, payload) => {
      return {
        ...state,
        profiles: payload.profiles
      }
    }),

    on(profileActions.currentProfileLoaded, (state, payload) => {
      return {
        ...state,
        currentProfile: payload.profile
      }
    }),

    on(profileActions.myProfileLoaded, (state, payload) => {
      return {
        ...state,
        myProfile: payload.profile
      }
    }),

    on(profileActions.mySubscribersShortListLoaded, (state, payload) => {
      return {
        ...state,
        mySubscribersShortList: payload.profiles
      }
    }),

    on(profileActions.myProfileSubscribersListLoaded, (state, payload) => {
      return {
        ...state,
        myProfileSubscribersList: payload.profiles
      }
    }),

    on(profileActions.avatarUploaded, (state, payload) => {
      return {
        ...state,
        myProfile: payload.profile
      }
    }),

    on(profileActions.profileDataPatched, (state, payload) => {
      return {
        ...state,
        myProfile: payload.profile
      }
    }),
  )
})
