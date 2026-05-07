import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css',
})
export class PatientDetails {}
