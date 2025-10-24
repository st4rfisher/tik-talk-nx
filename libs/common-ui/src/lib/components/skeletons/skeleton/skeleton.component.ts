import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, InputSignal, Signal, input, signal } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <span
      class="skeleton"
      [class.skeleton--circle]="variant() === 'circle'"
      [class.skeleton--rectangle]="variant() === 'rectangle'"
      [style.width]="width()"
      [style.height]="height()">
    </span>
  `,
  styleUrl: './skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SkeletonComponent {
  variant = input<'rectangle' | 'circle'>('rectangle')
  width = input('100%')
  height = input('1rem')
  // @Input() variant: 'rectangle' | 'circle' = 'rectangle';
  // @Input() width = '100%';
  // @Input() height = '1rem';
}
