import { CommonModule } from '@angular/common';
import { Component, forwardRef, inject, signal } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TtInputComponent } from "../tt-input/tt-input.component";
import { DadataService } from '../data';
import { BehaviorSubject, debounce, debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DadataSuggestion } from '../data/interfaces/dadata.interface';
import  { Address } from '@tt/shared'

@Component({
  selector: 'tt-address-input',
  standalone: true,
  imports: [
    CommonModule,
    TtInputComponent,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent) //функция forwardRef позволяет сослаться на компонент, который еще не проинициализировался
    }
  ]
})

export class AddressInputComponent implements ControlValueAccessor {
  #dadataService = inject(DadataService)
  innerSearchControl = new FormControl()
  isDropdownOpened = signal<boolean>(true)
  address$ = new BehaviorSubject<string>('')
  addressForm = new FormGroup({
    city: new FormControl<string | null>(null),
    street: new FormControl<string | null>(null),
    building: new FormControl<string | null>(null),
  })

  suggestions$ = this.innerSearchControl.valueChanges
    .pipe(
      debounceTime(500),
      switchMap(value => {
        return this.#dadataService.getSuggestion(value)
          .pipe(
            tap(response => {
              this.isDropdownOpened.set(!!response.length)
            })
          )
      })
    )

  ngOnInit(): void {
    this.addressForm.valueChanges.subscribe(
      (address) => {
        this.address$.next(`г. ${address.city}, ул. ${address.street}, д. ${address.building}`)
        this.onChange(this.address$.value)
      })
  }

  onSuggestionPick(suggest: DadataSuggestion) {
    this.isDropdownOpened.set(false)
    this.addressForm.patchValue({
      city: suggest.data.city,
      street: suggest.data.street,
      building: suggest.data.house
    })

    this.innerSearchControl.patchValue(
      `г. ${suggest.data.city}, ул. ${suggest.data.street}, д. ${suggest.data.house}`, {
      emitEvent: false
    })

    this.address$.next(`г. ${suggest.data.city}, ул. ${suggest.data.street}, д. ${suggest.data.house}`)
  }

  onChange(value: string | null) {}
  onTouched(): void {}

  //ниже 4 обязательных метода для реализации NG_VALUE_ACCESSOR для кастомного контрола
  writeValue(value: string | null) {
    this.innerSearchControl.patchValue(value, {
      emitEvent: false
    })
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {}
}
