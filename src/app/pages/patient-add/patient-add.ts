import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './patient-add.html',
  styleUrl: './patient-add.css',
})
export class PatientAdd {
  patientForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.patientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+ ]*$')]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      bloodType: [''],
      allergies: [''],
      emergencyContact: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.patientForm.valid) {
      this.isSubmitting = true;
      console.log('Registering Patient:', this.patientForm.value);
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        alert('Patient registered successfully!');
        this.router.navigate(['/patients']);
      }, 1500);
    } else {
      this.markFormGroupTouched(this.patientForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/patients']);
  }
}
