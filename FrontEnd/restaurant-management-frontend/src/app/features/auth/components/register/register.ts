import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {

  employeeForm: FormGroup;

  roles = ['Manager', 'Waiter', 'Chef', 'Counterer'];

  submitted = false;

  constructor(private fb: FormBuilder) {

    this.employeeForm = this.fb.group({

      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-Z ]+$/)
      ]],

      mobile: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]],

      address: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],

      role: ['', Validators.required]

    });

  }

  // Easy access to form controls
  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    console.log('Employee Registered:', this.employeeForm.value);

    alert('Employee Registered Successfully!');

    this.employeeForm.reset();
    this.submitted = false;

  }

  onReset() {
    this.employeeForm.reset();
    this.submitted = false;
  }

}