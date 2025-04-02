import { createFeature, createReducer, on } from "@ngrx/store";
import { Post } from '../../data';
import { postsActions } from "./actions";
import { PostComment } from "../interfaces/post.interface";

export interface PostState {
  posts: Post[],
  currentPostComments: PostComment[]
}

export const postsState: PostState = {
  posts: [],
  currentPostComments: []
}

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    postsState,

    on(postsActions.postsLoaded, (state, payload) => {
      return {
        ...state,
        posts: payload.posts
      }
    }),

    on(postsActions.commentsLoaded, (state, payload) => {
      return {
        ...state,
        currentPostComments: payload.comments
      }
    })
  )
})
