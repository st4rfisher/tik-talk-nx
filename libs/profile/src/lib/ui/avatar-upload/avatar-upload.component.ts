import { Component, computed, inject, signal } from '@angular/core';
import { IconComponent, DragAndDropDirective } from '@tt/common-ui';
import { profileActions, selectMyProfile } from '@tt/profile';
import { environment } from '@tt/environment';
// import { BASE_API_URL } from '../../../../../../global/variables';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-avatar-upload',
  standalone: true,
  imports: [
    IconComponent,
    DragAndDropDirective
  ],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  store = inject(Store)
  avatar: File | null = null;
  myProfile = this.store.selectSignal(selectMyProfile)
  preview = signal('/assets/images/default-avatar.svg');

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
    const reader = new FileReader();

    if (!file || !file.type.match('image')) return;

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatar = file;
  }

  setPreviewOnLoad() {}

  ngOnInit(): void {
    this.store.dispatch(profileActions.getMyProfile())

    if (this.myProfile()?.avatarUrl) {
      this.preview.set(
        `${environment.apiUrl}/${this.myProfile()?.avatarUrl}`
      );
    }
  }
}
