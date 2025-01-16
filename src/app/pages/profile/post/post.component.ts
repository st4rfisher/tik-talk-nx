import { PostComment, Post } from '@/model/post.interface';
import { Component, InputSignal, OnInit, computed, inject, input, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AvatarComponent } from "../../../common-ui/avatar/avatar.component";
import { DatePipe } from '@angular/common';
import { IconComponent } from "../../../common-ui/icon/icon.component";
import { PostInputComponent } from "../post-input/post-input.component";
import { CommentComponent } from "./comment/comment.component";
import { PostService } from '@/services/post.service';
import { MessageInputComponent } from "../../../common-ui/message-input/message-input.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarComponent,
    DatePipe,
    IconComponent,
    PostInputComponent,
    CommentComponent,
    MessageInputComponent
],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})

export class PostComponent implements OnInit {
  postService = inject(PostService)
  post = input<Post>()
  comments = signal<PostComment[]>([])
  initialPartOfComments = signal<PostComment[]>([])
  startValue = signal<number>(5)
  endValue = signal<number>(10)

  async onCreated() {
    const comments = await firstValueFrom(this.postService.getCommentsByPostId(this.post()!.id))
    this.comments.set(comments)
  }

  showMoreComments() {
    const nextPartOfComments = this.comments().slice(this.startValue(), this.endValue())
    console.log(nextPartOfComments)
    this.initialPartOfComments.set(nextPartOfComments)
    this.startValue.set(this.startValue() + 5)
    this.endValue.set(this.endValue() + 5)

  }

  async ngOnInit() {
    this.comments.set(this.post()!.comments)
    console.log(this.comments())
    // this.initialPartOfComments.set(this.comments().slice(0, 5))
    // console.log(this.comments.length)
  }
}


