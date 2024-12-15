import { Pipe, PipeTransform } from '@angular/core';
import { BASE_API_URL } from '@/global/variables';

@Pipe({
  name: 'imageUrl',
  standalone: true
})

export class ImageUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if(!value) return null
    return `${BASE_API_URL}/${value}`;
  }
}
