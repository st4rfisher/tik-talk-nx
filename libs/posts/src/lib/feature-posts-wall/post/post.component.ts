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
import { Post, PostComment, PostService, postsActions, selectComments } from '../../data';
import { CommentComponent, PostInputComponent } from '../../ui';
import { Store } from '@ngrx/store';
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
  // store = inject(Store);
  post = input<Post>();
  comments = signal<PostComment[]>([]);

  async onCreated() {
    // this.store.dispatch(postsActions.fetchComments({ postId: this.post()?.id as number }))
    // const comments = await firstValueFrom(
    //   this.postService.getCommentsByPostId(this.post()!.id)
    // );
    // this.comments = this.store.selectSignal(selectComments)
    // this.comments.set(comments) ;
  }

  async ngOnInit() {
    // console.log(this.post())
    this.comments.set(this.post()!.comments);
    // console.log(this.comments());
    // this.initialPartOfComments.set(this.comments().slice(0, 5))
    // console.log(this.comments.length)
  }
}
