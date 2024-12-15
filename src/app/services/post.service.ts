import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { PostCreateDTObject, CommentCreateDTObject } from '@/model/post.interface';
import { Post } from '@/model/post.interface';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private http = inject(HttpClient)
  baseApiUrl = "https://icherniakov.ru/yt-course"
  posts = signal<Post[]>([])

  createPost(payload: PostCreateDTObject) {
    return this.http.post<Post>(`${this.baseApiUrl}/post/`, payload)
      .pipe(
        switchMap(() => {
          return this.fetchPosts()
        })
      )
  }

  createComment(payload: CommentCreateDTObject) {
    return this.http.post<Comment>(`${this.baseApiUrl}/comment/`, payload)
  }

  fetchPosts() {
    return this.http.get<Post[]>(`${this.baseApiUrl}/post/`)
      .pipe(
        tap(response => this.posts.set(response))
      )
  }

  getCommentsByPostId(postId: number) {
    return this.http.get<Post>(`${this.baseApiUrl}/post/${postId}`)
      .pipe(
        map(response => response.comments)
      )
  }
}
