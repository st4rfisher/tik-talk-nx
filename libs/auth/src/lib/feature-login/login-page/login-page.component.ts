import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService, loginQueryActions } from '@tt/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})

export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store)
  isPasswordVisible = signal<boolean>(false);
  form: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  submit() {
    if (this.form.valid) {
      // console.log(this.form.value)
      this.store.dispatch(loginQueryActions.login({data: this.form.value}))
      //@ts-ignore
      // this.authService.login(this.form.value).subscribe((response) => {
      //   this.router.navigate(['']);
      //   console.log(response);
      // });
    }
  }
}
