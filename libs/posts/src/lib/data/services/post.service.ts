import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Post, PostCreateDTObject, CommentCreateDTObject } from '../../data';
import { map, switchMap, tap } from 'rxjs';
// import { BASE_API_URL } from '../../../../../../global/variables';
import { environment } from '@tt/environment'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);

  createPost(payload: PostCreateDTObject) {
    return this.http.post<Post>(`${environment.apiUrl}/post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  createComment(payload: CommentCreateDTObject) {
    return this.http.post<Comment>(`${environment.apiUrl}/comment/`, payload);
  }

  fetchPosts() {
    return this.http.get<Post[]>(`${environment.apiUrl}/post/`)
  }

  getCommentsByPostId(postId: number) {
    return this.http.get<Post>(`${environment.apiUrl}/post/${postId}`)
      .pipe(map((response) => response.comments));
  }
}
