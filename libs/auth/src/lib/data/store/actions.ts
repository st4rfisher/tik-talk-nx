import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TokenResponse, loginData } from "../auth/auth.interface";

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    'login': props<{data: loginData}>(),
    'logout': emptyProps(),
    'save tokens to store': props<{tokens: TokenResponse}>(),
    'save tokens to cookies': props<{tokens: TokenResponse}>(),
    'refresh token': emptyProps(),
    // 'refresh token': props<{refresh_token: string}>()
  }
})
