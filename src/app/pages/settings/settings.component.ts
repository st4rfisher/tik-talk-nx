import { Component, effect, inject } from '@angular/core';
import { ProfileHeaderComponent } from '@/components/profile-header/profile-header.component';
import { ProfileService } from '@/services/profile.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { IconComponent } from '@/components/icon/icon.component';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from "./avatar-upload/avatar-upload.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule,
    AsyncPipe,
    // IconComponent,
    AvatarUploadComponent
],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  profileService = inject(ProfileService)
  myProfile$ = toObservable(this.profileService.myProfile)
  formBuilder = inject(FormBuilder)
  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{value: '', disabled: true}, Validators.required],
    description: [''],
    stack: ['']
  })

  constructor() {
    effect(() => {
      this.form.patchValue({
        ...this.profileService.myProfile(),
        stack: this.mergeStack(this.profileService.myProfile()?.stack)
      })
    })
  }

  onSave() {
    console.log(1)
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()

    //@ts-ignore
    firstValueFrom(this.profileService.patchProfileData({
      ...this.form.value,
      stack: this.splitStack(this.form.value.stack)
    }))
  }

  splitStack(stack: string | null | string[] | undefined) {
    if(!stack) return []
    if(Array.isArray(stack)) return stack

    return stack.split(',')
  }

  mergeStack(stack: string | null | string[] | undefined) {
    if(!stack) return ''
    if(Array.isArray(stack)) return stack.join(',')

    return stack
  }
}
