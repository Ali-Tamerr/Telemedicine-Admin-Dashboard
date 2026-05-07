import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './appointment-add.html',
  styleUrl: './appointment-add.css'
})
export class AppointmentAdd {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  appointmentForm: FormGroup = this.fb.group({
    patientName: ['', [Validators.required]],
    appointmentType: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    notes: ['']
  });

  isSubmitting = false;

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.isSubmitting = true;
      // Mock API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.router.navigate(['/appointments']);
      }, 1000);
    } else {
      this.appointmentForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/appointments']);
  }
}
