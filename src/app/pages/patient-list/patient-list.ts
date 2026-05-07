import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {}
