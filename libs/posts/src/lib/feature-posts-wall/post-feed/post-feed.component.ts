import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  inject,
} from '@angular/core';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { Store } from '@ngrx/store';
import { postsActions, selectPosts } from '../../data/store';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})

export class PostFeedComponent {
  store = inject(Store)
  posts = this.store.selectSignal(selectPosts);
  hostElement = inject(ElementRef);
  renderer = inject(Renderer2); //прослойка для взаимодействия с элементами на разных платформах

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  constructor() {
    // console.log(this.posts())
    this.store.dispatch(postsActions.fetchPosts())
  }

  ngAfterViewInit(): void {
    this.resizeFeed();
  }

  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24;
    this.renderer.setStyle(
      this.hostElement.nativeElement,
      'height',
      `${height}px`
    );
  }
}
