import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  showPassword = false;

  loginForm = this.fb.group({

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    password: ['', Validators.required],

    rememberMe: [false]

  });

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.getRawValue()).subscribe({

      next: (response) => {

        // Clear previous login information
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        // Store token according to Remember Me
        if (this.loginForm.value.rememberMe) {

          localStorage.setItem('token', response.token);

        } else {

          sessionStorage.setItem('token', response.token);

        }

        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        alert('Login successful!');

        this.router.navigate(['/dashboard']);

      },

      error: (error) => {

        console.error('Login Error:', error);

        alert(
          error.error?.message ||
          'Invalid email or password'
        );

      }

    });

  }
}
