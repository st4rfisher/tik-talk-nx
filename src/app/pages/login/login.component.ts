import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router)
  isPasswordVisible = signal<boolean>(false)
  form: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  })

  submit() {
    if(this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        response => {
          this.router.navigate([''])
          console.log(response)
        }
      )
    }
  }
}
