import { createFeature, createReducer, on } from "@ngrx/store";
import { loginQueryActions, loginResponseActions } from "./actions";

export interface LoginState {
  access_token: string | null,
  refresh_token: string | null,
}

export const loginState: LoginState = {
  access_token: null,
  refresh_token: null
}

export const loginFeature = createFeature({
  name: 'loginFeature',
  reducer: createReducer(
    loginState,

    on(loginResponseActions.setTokenToStore, (state, payload) => {
      console.log(payload)
      return {
        ...state,
        access_token: payload.token.access_token,
        refresh_token: payload.token.refresh_token,
      }
    }),

    // on(loginResponseActions.setRefreshToken, (state, payload) => {
    //   // console.log(payload.chats)
    //   return {
    //     ...state,
    //     refreshToken: payload.token,
    //   }
    // }),


  )
})
