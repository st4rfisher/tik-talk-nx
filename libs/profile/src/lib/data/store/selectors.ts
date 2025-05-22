import { createSelector } from "@ngrx/store";
import { profileFeature } from "./reducer";

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles
)

export const selectProfilePageable = createSelector(
  profileFeature.selectProfileFeatureState,
  (state) => {
    return {
      page: state.page,
      size: state.size
    }
  }
)

export const selectProfileFilters = createSelector(
  profileFeature.selectProfileFilters,
  (filters) => filters
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
