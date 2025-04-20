import { createSelector } from "@ngrx/store";
import { loginFeature } from "./reducer";

export const selectAccessToken = createSelector(
  loginFeature.selectAccess_token,
  (accessToken) => accessToken
)

export const selectRefreshToken = createSelector(
  loginFeature.selectRefresh_token,
  (refreshToken) => refreshToken
)

// export const selectIsAuth = createSelector(
//   loginFeature.selectIsAuth,
//   (isAuth) => isAuth
// )

