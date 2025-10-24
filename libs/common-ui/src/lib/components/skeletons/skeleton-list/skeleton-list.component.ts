import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, computed, contentChild, input } from '@angular/core';
import { SkeletonComponent } from "../skeleton/skeleton.component";

@Component({
  selector: 'app-skeleton-list',
  standalone: true,
  imports: [
    CommonModule,
],
  template: `
    <ng-container [class]="className()" *ngFor="let _ of times; index as i">
      <ng-container *ngTemplateOutlet="template()!"></ng-container>
    </ng-container>
  `,
  styleUrl: './skeleton-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SkeletonListComponent {
  skeletonCount = input<number>(3)
  className = input<string | null>(null)
  template = contentChild<TemplateRef<any>>(TemplateRef)
  get times() {
    return Array.from({ length: this.skeletonCount() })
  }
 }
