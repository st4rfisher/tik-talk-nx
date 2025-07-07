import { CommonModule } from '@angular/common';
import { Component, computed, effect, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'tt-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconComponent
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
  //входные параметры
  type = input<'text' | 'password'>('text')
  placeholder = input<string>()
  isAutocomplete = input<boolean>(false);

  //локальные параметры
  localType = signal<'text' | 'password'>(this.type())
  isPasswordVisible = signal<boolean>(false);
  isDisabled = signal<boolean>(false)

  //Параметры для кастомного контрола
  onChange: any
  onTouched: any
  value: string | null = null

  ngOnInit(): void {
    this.localType.set(this.type());
  }

  onModelChange(value: string | null): void {
    this.onChange(value)
  }

  togglePasswordVisibility() {
    this.localType() === 'password' ? this.localType.set("text") : this.localType.set("password")
    this.isPasswordVisible.set(!this.isPasswordVisible())
  }

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
    this.isDisabled.set(isDisabled)
  }
}
