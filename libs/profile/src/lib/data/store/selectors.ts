import { createSelector } from "@ngrx/store";
import { profileFeature } from "./reducer";

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles
)

export const selectCurrentProfile = createSelector(
  profileFeature.selectCurrentProfile,
  (currentProfile) => currentProfile
)

export const selectMyProfile = createSelector(
  profileFeature.selectMyProfile,
  (myProfile) => myProfile
)

export const selectMySubscribersShortList = createSelector(
  profileFeature.selectMySubscribersShortList,
  (mySubscribersShortList) => mySubscribersShortList
)

export const selectMyProfileSubscribersList = createSelector(
  profileFeature.selectMyProfileSubscribersList,
  (myProfileSubscribersList) => myProfileSubscribersList
)
