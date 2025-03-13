import { Component, ViewChild, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui';
import { ProfileService } from '@tt/profile';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from '../../ui';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AsyncPipe,
    // IconComponent,
    AvatarUploadComponent,
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;
  profileService = inject(ProfileService);
  myProfile$ = toObservable(this.profileService.myProfile);
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.profileService.myProfile(),
        stack: this.mergeStack(this.profileService.myProfile()?.stack),
      });
    });
  }

  onSave() {
    console.log(1);
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      firstValueFrom(
        //@ts-ignore
        this.profileService.uploadAvatar(this.avatarUploader.avatar)
      );
      console.log(this.avatarUploader.avatar);
    }

    firstValueFrom(
      //@ts-ignore
      this.profileService.patchProfileData({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      })
    );
  }

  splitStack(stack: string | null | string[] | undefined) {
    if (!stack) return [];
    if (Array.isArray(stack)) return stack;

    return stack.split(',');
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if (!stack) return '';
    if (Array.isArray(stack)) return stack.join(',');

    return stack;
  }
}
