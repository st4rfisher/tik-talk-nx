import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TokenResponse } from "../interfaces/auth.interface";

export const loginQueryActions = createActionGroup({
  source: 'login',
  events: {
    'login': props<{data: { username: string; password: string}}>(),
    'refreshToken': emptyProps,
  }
})

export const loginResponseActions = createActionGroup({
  source: 'login',
  events: {
    'set Token To Store': props<{token: TokenResponse}>(),
    // 'set Token To Cookie': props<{token: TokenResponse}>(),
    'set RefreshToken': props<{token: string}>(),
  }
})
