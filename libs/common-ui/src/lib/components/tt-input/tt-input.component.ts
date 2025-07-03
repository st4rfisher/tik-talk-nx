import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'tt-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './tt-input.component.html',
  styleUrl: './tt-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TtInputComponent) //функция forwardRef позволяет сослаться на компонент, который еще не проинициализировался
    }
  ]
})

export class TtInputComponent implements ControlValueAccessor {
  type = input<'text' | 'password'>('text')
  placeholder = input<string>()
  onChange: any
  onTouched: any
  value: string | null = null
  disabled = signal<boolean>(false)

  //ниже 4 обязательных метода для реализации NG_VALUE_ACCESSOR для кастомного контрола
  writeValue(value: string | null) {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled)
  }

  onModelChange(value: string | null): void {
    this.onChange(value)
  }
}
