import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, HostBinding, HostListener, forwardRef } from '@angular/core';
import { IconComponent } from "../icon/icon.component";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'tt-stack-input',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    FormsModule,
    AsyncPipe
],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  providers: [
    {
      //провайдим ControlValueAccessor
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      //настройка, которая говорит на какой компонент подключить директиву
      useExisting: forwardRef(() => StackInputComponent) //функция forwardRef позволяет сослаться на компонент, который еще не проинициализировался
    }
  ]
})

export class StackInputComponent implements ControlValueAccessor {
  value$ = new BehaviorSubject<string[]>([])
  innerInput = ''
  #disabled = false

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.#disabled
  }

  //прослушиватель событий, который висит на шаблоне данного компонента
  //и выполнится, когда сработает указанное событие
  @HostListener('keydown.enter', ['$event']) //['$event'] то же самое, что (click)="fn($event)" в шаблоне на элементе
  onEnter(event: KeyboardEvent) {
    event.stopPropagation()
    event.preventDefault()

    if (!this.innerInput) return

    this.value$.next([...this.value$.value, this.innerInput])
    this.innerInput = ''
    this.onChange(this.value$.value)
  }

  onTagDelete(i: number) {
    const tags = Array.from(this.value$.value)
    tags.splice(i, 1)
    this.value$.next(tags)
    this.onChange(this.value$.value)
  }

  //ниже обязательные методы для реализации NG_VALUE_ACCESSOR для кастомного контрола
  writeValue(stack: string[] | null) {
    if(!stack) {
      this.value$.next([])
      return
    }

    this.value$.next(stack)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.#disabled = isDisabled
  }

  onChange(value: string[] | null) {}
  onTouched(): void {}
}
