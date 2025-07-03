import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormRecord, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Feature, MockService } from '../experimental/mock.service';
import { startWith } from 'rxjs';
import { NameValidator } from '../experimental/name.validator';

enum ReceiverType{
  PERSON = 'PERSON',
  LEGAL = 'LEGAL'
}

interface Address {
  city?: string,
  street?: string,
  building?: number,
  apartment?: number
}

function getAddressForm(initiaValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initiaValue.city ?? ''),
    street: new FormControl<string>(initiaValue.street ?? ''),
    building: new FormControl<number | null>(initiaValue.building ?? null),
    apartment: new FormControl<number | null>(initiaValue.apartment ?? null),
  })
}

function validateStartsWith(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
    ? {startsWith: {message: `${forbiddenLetter} - запрещенная буква`}}
    : null
  }
}

function validateDateRange({fromControlName, toControlName}: {fromControlName: string, toControlName: string}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName)
    const toControl = control.get(toControlName)

    if(!fromControl || !toControl) return null

    const fromDate = new Date(fromControl.value)
    const toDate = new Date(toControl.value)

    if (fromDate && toDate && fromDate > toDate) {
      toControl.setErrors({dateRange: {message: 'Дата начала не может быть позднее даты окончания'}})
      return {dateRange: {message: 'Дата начала не может быть позднее даты окончания'}}
    }

    return null
  }
}

// const validateStartsWith: ValidatorFn = (control: AbstractControl) => {
//   return control.value.startsWith('я') ? {startsWith: 'Текст валидатора'} : null
// }

@Component({
  selector: 'app-forms-experiment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FormsExperimentComponent {
  ReceiverType = ReceiverType
  mockService = inject(MockService)
  nameValidator = inject(NameValidator)
  features: Feature[] = []
  // #fb = inject(FormBuilder)

  // form = this.#fb.group({
  //   type: this.#fb.nonNullable.control<ReceiverType>(ReceiverType.PERSON),
  //   name: this.#fb.control<string>(''),
  //   inn: this.#fb.control<string>(''),
  //   lastName: this.#fb.control<string>(''),
  //   address: this.#fb.group({
  //     city: this.#fb.control<string>(''),
  //     street: this.#fb.control<string>(''),
  //     building: this.#fb.control<number | null>(null),
  //     apartment: this.#fb.control<number | null>(null),
  //   })
  // })

  form = new FormGroup({
    type: new FormControl<ReceiverType>(ReceiverType.PERSON),
    name: new FormControl<string>('', {
      validators: [Validators.required],
      asyncValidators: [this.nameValidator.validate.bind(this.nameValidator)], // чтобы не было потери контекста пишем через bind контекст this
      updateOn: 'blur'
    }),
    inn: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm()]),
    feature: new FormRecord({}),
    dateRange: new FormGroup({
      from: new FormControl<string>(''),
      to: new FormControl<string>(''),
    }, validateDateRange({fromControlName: 'from', toControlName: 'to'}))
  })

  constructor() {
    this.mockService.getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe(addresses => {
        // while(this.form.controls.addresses.controls.length > 0) {
        //   this.form.controls.addresses.removeAt(0)
        // }
        this.form.controls.addresses.clear()

        for(const address of addresses) {
          // this.form.controls.addresses.push(getAddressForm(address))
          this.form.controls.addresses.push(getAddressForm(address))
        }

        // this.form.controls.addresses.setControl(1, getAddressForm())
        console.log(this.form.controls.addresses.at(0))
      })

      this.mockService.getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe(features => {
        this.features = features

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          )
        }
      })

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => {
        // console.log('type event')
        this.form.controls.inn.clearValidators()

        if (value === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(10)])
        }
      })

      this.form.valueChanges.subscribe(
        (value) => console.log(value)
      )
  }

  addAddress() {
    // this.form.controls.addresses.push(
    //   getAddressForm()
    // )

    this.form.controls.addresses.insert(0, getAddressForm())
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, {
      emitEvent: false
    })
  }

  sort = () => 0

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    console.log(this.form)
    if (this.form.invalid) return
    // this.form.reset({
    //   type: ReceiverType.PERSON,
    //   name: 'Lucas'
    // })
    console.log(this.form.valid)
    console.log(this.form.value)

    // const formPatch = {
    //   name: "Name",
    //   lastName: "LastName"
    // }

    // this.form.controls.type.patchValue(ReceiverType.LEGAL, {
    //   // emitEvent: true,
    //   onlySelf: true
    // })

    // this.form.patchValue(formPatch)
  }
}
