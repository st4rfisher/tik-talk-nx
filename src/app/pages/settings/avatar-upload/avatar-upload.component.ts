import { Component, inject, signal } from '@angular/core';
import { IconComponent } from '@/common-ui/icon/icon.component';
import { DragAndDropDirective } from '@/common-ui/directives/drag-and-drop.directive';
import { ProfileService } from '@/services/profile.service';
import { BASE_API_URL } from '@/global/variables';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [
    IconComponent,
    DragAndDropDirective
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss'
})

export class AvatarUploadComponent {
  profileService = inject(ProfileService)
  preview = signal('/assets/images/default-avatar.svg')
  avatar: File | null = null

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0]
    this.processFile(file)
  }

  onFileDropped(file: File) {
    this.processFile(file)
  }

  processFile (file: File | null | undefined) {
    const reader = new FileReader()

    if(!file || !file.type.match('image')) return

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '')
    }

    reader.readAsDataURL(file)
    this.avatar = file

  }

  setPreviewOnLoad() {

  }

  ngOnInit(): void {
    if(this.profileService.myProfile()?.avatarUrl) {
      this.preview.set(`${BASE_API_URL}/${this.profileService.myProfile()?.avatarUrl}`)
    }
  }
}
