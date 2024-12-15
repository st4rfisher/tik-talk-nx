import { Component, EventEmitter, HostBinding, Output, Renderer2, inject, input } from '@angular/core';
import { AvatarComponent } from "../../../common-ui/avatar/avatar.component";
import { ProfileService } from '@/services/profile.service';
import { NgIf } from '@angular/common';
import { PostService } from '@/services/post.service';
import { FormsModule } from "@angular/forms";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-input',
  standalone: true,
  imports: [
    AvatarComponent,
    NgIf,
    FormsModule
  ],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss'
})

export class PostInputComponent {
  //PostInput имеет 2 вида - PostInput для создания поста
  //и PostInput внутри уже созданного поста для комментариев

  isCommentInput = input<boolean>(false)
  postId = input<number>(0)
  renderer = inject(Renderer2) //прослойка для взаимодействия с элементами на разных платформах
  myProfile = inject(ProfileService).myProfile
  postService = inject(PostService)
  text = ''

  @Output() created = new EventEmitter()
  @HostBinding('class.comment')
  get isComment() {
    return this.isCommentInput()
  }

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement

    this.renderer.setStyle(textArea, 'height', 'auto')
    this.renderer.setStyle(textArea, 'height', textArea.scrollHeight + 'px')
  }

  onCreatePost() {
    if(!this.text) return

    firstValueFrom(this.postService.createPost({
      title: '',
      content: this.text,
      authorId: this.myProfile()!.id
    })).then(() => this.text = '')
  }

  onCreateComment() {
    if(!this.text) return

    firstValueFrom(this.postService.createComment({
      text: this.text,
      authorId: this.myProfile()!.id,
      postId: this.postId()
    })).then(() => {
      this.text = ''
      this.created.emit()
    })
  }
}
