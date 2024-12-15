import { Component, input } from '@angular/core';
import { PostComment } from '@/model/post.interface';
import { AvatarComponent } from "../../../../common-ui/avatar/avatar.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    AvatarComponent,
    DatePipe
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})

export class CommentComponent {
  comment = input<PostComment>()
}
