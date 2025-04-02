import { createSelector } from "@ngrx/store";
import { postsFeature } from "./reducer";

export const selectPosts = createSelector(
  postsFeature.selectPosts,
  (posts) => posts
)

export const selectComments = createSelector(
  postsFeature.selectCurrentPostComments,
  (comments) => {
    console.log(comments)
    return comments }
)
