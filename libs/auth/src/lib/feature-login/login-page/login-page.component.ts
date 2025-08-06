import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@tt/auth';
import { Router } from '@angular/router';
import { TtInputComponent } from "@tt/common-ui";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, TtInputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})

export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isPasswordVisible = signal<boolean>(false);
  form: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      console.log(value)
    })

    // this.form.controls["username"].disable()
  }

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe((response) => {
        this.router.navigate(['']);
        console.log(response);
      });
    }
  }
}
