import { createFeature, createReducer, on } from "@ngrx/store";
import { authActions } from "./actions";

export interface AuthState {
  access_token: string | null,
  refresh_token: string | null,
}

export const authState: AuthState = {
  access_token: null,
  refresh_token: null,
}

export const authFeature = createFeature({
  name: 'authFeature',
  reducer: createReducer(
    authState,

    on(authActions.saveTokensToStore, (state, payload) => {
      return {
        ...state,
        access_token: payload.tokens.access_token,
        refresh_token: payload.tokens.refresh_token
      }
    }),
  )
})
