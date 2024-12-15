import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { PostCreateDTObject, CommentCreateDTObject } from '@/model/post.interface';
import { Post } from '@/model/post.interface';
import { map, switchMap, tap } from 'rxjs';
import { BASE_API_URL } from '@/global/variables';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private http = inject(HttpClient)
  posts = signal<Post[]>([])

  createPost(payload: PostCreateDTObject) {
    return this.http.post<Post>(`${BASE_API_URL}/post/`, payload)
      .pipe(
        switchMap(() => {
          return this.fetchPosts()
        })
      )
  }

  createComment(payload: CommentCreateDTObject) {
    return this.http.post<Comment>(`${BASE_API_URL}/comment/`, payload)
  }

  fetchPosts() {
    return this.http.get<Post[]>(`${BASE_API_URL}/post/`)
      .pipe(
        tap(response => this.posts.set(response))
      )
  }

  getCommentsByPostId(postId: number) {
    return this.http.get<Post>(`${BASE_API_URL}/post/${postId}`)
      .pipe(
        map(response => response.comments)
      )
  }
}
