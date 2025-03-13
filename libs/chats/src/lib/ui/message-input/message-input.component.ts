import { ProfileService } from '@tt/profile';
import { Component, EventEmitter, Output, Renderer2, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AvatarComponent, IconComponent } from '@tt/common-ui';;

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
