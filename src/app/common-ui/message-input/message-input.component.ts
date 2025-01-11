import { ProfileService } from '@/services/profile.service';
import { Component, EventEmitter, Output, Renderer2, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { AvatarComponent } from "../avatar/avatar.component";
import { FormsModule } from "@angular/forms";
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [
    NgIf,
    AvatarComponent,
    FormsModule,
    IconComponent
],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss'
})

export class MessageInputComponent {
  myProfile = inject(ProfileService).myProfile
  renderer = inject(Renderer2) //прослойка для взаимодействия с элементами на разных платформах
  @Output() created = new EventEmitter<string>()
  text = ''

  onTextAreaInput(event: Event) {
    const textArea = event.target as HTMLTextAreaElement

    this.renderer.setStyle(textArea, 'height', 'auto')
    this.renderer.setStyle(textArea, 'height', textArea.scrollHeight + 'px')
  }

  onCreateMessage() {
    if(!this.text) return

    this.created.emit(this.text)
    this.text = ''
  }
}
