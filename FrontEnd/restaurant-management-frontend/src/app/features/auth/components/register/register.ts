import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth-api';

// Password match validator
function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {

  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  roles = ['Chef', 'Manager', 'Waiter', 'Counter'];

  registerForm = this.fb.group({

    name: ['', [
      Validators.required,
      Validators.minLength(3)
    ]],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    phone: ['', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]],

    role: ['', Validators.required],

    password: ['', [
      Validators.required,
      Validators.minLength(6)
    ]],

    confirmPassword: ['', Validators.required]

  }, {
    validators: passwordMatchValidator
  });

  onSubmit(): void {

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formData = this.registerForm.getRawValue();

    // Check password matching
    if (formData.password !== formData.confirmPassword) {
      this.registerForm.setErrors({ passwordMismatch: true });
      return;
    }

    // Remove confirmPassword before sending to backend
    const { confirmPassword, ...registerData } = formData;

    this.authService.register(registerData).subscribe({

      next: (response: any) => {

        alert(response.message || 'Registration successful!');

        this.registerForm.reset();

        this.router.navigate(['/login']);

      },

      error: (error) => {

        console.error('Registration Error:', error);

        alert(
          error.error?.message ||
          'Registration failed. Please try again.'
        );

      }

    });

  }

}