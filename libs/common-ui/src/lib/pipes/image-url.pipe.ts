import { Pipe, PipeTransform } from '@angular/core';
// import { BASE_API_URL } from '../../../../../global/variables';
import { environment } from '@tt/environment';
import { endPoints } from '@tt/global'

@Pipe({
  name: 'imageUrl',
  standalone: true,
})

export class ImageUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return null;
    return `${endPoints.targetUrl}/${value}`;
    
  }
}
