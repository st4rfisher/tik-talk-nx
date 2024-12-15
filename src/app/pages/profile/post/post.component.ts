import { PostComment, Post } from '@/model/post.interface';
import { Component, InputSignal, OnInit, inject, input, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AvatarComponent } from "../../../common-ui/avatar/avatar.component";
import { DatePipe

 } from '@angular/common';
import { IconComponent } from "../../../common-ui/icon/icon.component";
import { PostInputComponent } from "../post-input/post-input.component";
import { CommentComponent } from "./comment/comment.component";
import { PostService } from '@/services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarComponent,
    DatePipe,
    IconComponent,
    PostInputComponent,
    CommentComponent
],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent implements OnInit {
  post = input<Post>()
  comments = signal<PostComment[]>([])
  postService = inject(PostService)

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
    this.comments.set(comments)
  }

  async ngOnInit() {
    this.comments.set(this.post()!.comments)
  }
}


