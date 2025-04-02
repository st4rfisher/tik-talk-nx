import { Injectable, inject } from '@angular/core';
import { PostService } from '../../data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { postsActions } from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostsEffects {
  postService = inject(PostService)
  actions$ = inject(Actions)

  fetchPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchPosts),
      switchMap(() => {
        return this.postService.fetchPosts()
      }),
      map(response => {
        // console.log(response)
        return postsActions.postsLoaded({posts: response})
      })
    )
  })

  fetchComments = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchComments),
      switchMap(({postId}) => {
        console.log(postId)
        return this.postService.getCommentsByPostId(postId)
      }),
      map(response => {
        console.log(response)
        return postsActions.commentsLoaded({comments: response})
      })
    )
  })
}
