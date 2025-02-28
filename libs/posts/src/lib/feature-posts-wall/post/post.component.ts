import {
  Component,
  InputSignal,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AvatarComponent } from '@tt/common-ui';
import { DatePipe } from '@angular/common';
import { IconComponent } from '@tt/common-ui';
import { Post, PostComment, PostService } from '../../data';
import { CommentComponent, PostInputComponent } from '../../ui';

// import { MessageInputComponent } from '../../../common-ui/message-input/message-input.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    AvatarComponent,
    DatePipe,
    IconComponent,
    PostInputComponent,
    CommentComponent,
    // MessageInputComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  postService = inject(PostService);
  post = input<Post>();
  comments = signal<PostComment[]>([]);
  initialPartOfComments = signal<PostComment[]>([]);
  startValue = signal<number>(5);
  endValue = signal<number>(10);

  async onCreated() {
    const comments = await firstValueFrom(
      this.postService.getCommentsByPostId(this.post()!.id)
    );
    this.comments.set(comments);
  }

  showMoreComments() {
    const nextPartOfComments = this.comments().slice(
      this.startValue(),
      this.endValue()
    );
    console.log(nextPartOfComments);
    this.initialPartOfComments.set(nextPartOfComments);
    this.startValue.set(this.startValue() + 5);
    this.endValue.set(this.endValue() + 5);
  }

  async ngOnInit() {
    this.comments.set(this.post()!.comments);
    console.log(this.comments());
    // this.initialPartOfComments.set(this.comments().slice(0, 5))
    // console.log(this.comments.length)
  }
}
