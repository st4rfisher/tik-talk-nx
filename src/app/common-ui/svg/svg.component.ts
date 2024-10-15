import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  template: '<svg:use [attr.href]="path"></svg:use>',
  styles: ''
})

export class SvgComponent {
  @Input() icon = ''

  get path() {
    return `/assets/images/${this.icon}.svg#${this.icon}`
  }
}
