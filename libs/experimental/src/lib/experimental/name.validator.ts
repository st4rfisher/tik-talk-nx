import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
// import { BASE_API_URL } from 'global/variables';
import { Profile } from "@tt/interfaces/profile"
import { environment } from '@tt/environment';

@Injectable({
  providedIn: 'root'
})

export class NameValidator implements AsyncValidator {
  http = inject(HttpClient)

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    return this.http.get<Profile[]>(`${environment.apiUrl}/account/test_accounts`)
      .pipe(
        map(users => {
          return users.filter(user => user.firstName === control.value).length > 0
          ? null
          : {nameValid: {message: `Имя должно быть одним из списка: ${users.map(user => user.firstName).join(', ')}`}}
        })
      )
  }
}
