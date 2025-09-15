import { createSelector } from "@ngrx/store";
import { authFeature } from "./reducer";

export const selectAccess_token = createSelector(
  authFeature.selectAccess_token,
  (access_token) => access_token
)

export const selectRefresh_token = createSelector(
  authFeature.selectRefresh_token,
  (refresh_token) => refresh_token
)
