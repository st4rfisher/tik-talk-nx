import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Post, PostComment } from "../interfaces/post.interface";

export const postsActions = createActionGroup({
  source: 'posts',
  events: {
    'fetch posts': emptyProps(),
    'posts loaded': props<{posts: Post[]}>(),
    'fetch comments': props<{postId: number}>(),
    'comments loaded': props<{comments: PostComment[]}>(),
  }
})
