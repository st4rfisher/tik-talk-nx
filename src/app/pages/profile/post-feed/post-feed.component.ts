import { Component, ElementRef, HostListener, Renderer2, inject } from '@angular/core';
import { PostInputComponent } from "../post-input/post-input.component";
import { PostComponent } from "../post/post.component";
import { PostService } from '@/services/post.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})

export class PostFeedComponent {
  postService = inject(PostService)
  posts = this.postService.posts
  hostElement = inject(ElementRef)
  renderer = inject(Renderer2) //прослойка для взаимодействия с элементами на разных платформах

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed()
    console.log(1)
  }

  constructor() {
    firstValueFrom(this.postService.fetchPosts())
  }

  ngAfterViewInit(): void {
    this.resizeFeed()
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect()
    const height = window.innerHeight - top - 24
    this.renderer.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
  }
}
