import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-trigger',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './infinite-scroll-trigger.component.html',
  styleUrl: './infinite-scroll-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollTriggerComponent implements OnInit {
  loaded = output<void>()

  ngOnInit(): void {
    this.loaded.emit()
  }
}
