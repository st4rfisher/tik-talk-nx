import { Component, ViewChild, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from '../../ui';
import { profileActions, selectMyProfile } from '@tt/profile';
import { AsyncPipe } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AvatarUploadComponent } from '../../ui';
import { Store } from '@ngrx/store';
import { StackInputComponent } from "../../../../../common-ui/src/lib/components/stack-input/stack-input.component";
import { IconComponent } from '@tt/common-ui'
import { AddressInputComponent } from "@tt/common-ui";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AsyncPipe,
    IconComponent,
    AvatarUploadComponent,
    AddressInputComponent
],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  @ViewChild(AvatarUploadComponent) avatarUploader!: AvatarUploadComponent;
  store = inject(Store)
  myProfile = this.store.selectSignal(selectMyProfile)
  myProfile$ = this.store.select(selectMyProfile)
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
    city: ['']
  });

  constructor() {
    effect(() => {
      //@ts-ignore
      this.form.patchValue({
        ...this.myProfile(),
        // stack: this.mergeStack(this.myProfile()?.stack),
      });
    });

    this.myProfile$.subscribe(data => {
      console.log(data)
      //@ts-ignore
      // this.form.patchValue({
      //   ...data,
      //   // stack: this.mergeStack(this.myProfile()?.stack),
      // });
    })
  }

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    if (this.avatarUploader.avatar) {
      this.store.dispatch(profileActions.uploadAvatar({ avatar: this.avatarUploader.avatar}))
    }

    this.store.dispatch(profileActions.patchProfileData({
      //@ts-ignore
      data: {
        ...this.form.value,
        // stack: this.splitStack(this.form.value.stack)
      }
    }))

    console.log(this.form.value)
  }

  // splitStack(stack: string | null | string[] | undefined): string[] {
  //   if (!stack) return [];
  //   if (Array.isArray(stack)) return stack;

  //   return stack.split(',');
  // }

  // mergeStack(stack: string | null | string[] | undefined) {
  //   if (!stack) return '';
  //   if (Array.isArray(stack)) return stack.join(',');

  //   return stack;
  // }

  ngOnInit() {
    this.store.dispatch(profileActions.getMyProfile())
  }
}
