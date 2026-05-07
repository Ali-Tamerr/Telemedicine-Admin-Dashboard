import { Component } from '@angular/core';
import { VitalSignsChart } from '../dashboard/components/vital-signs-chart/vital-signs-chart';

@Component({
  selector: 'app-teleconsultation',
  standalone: true,
  imports: [VitalSignsChart],
  templateUrl: './teleconsultation.html',
  styleUrl: './teleconsultation.css',
})
export class Teleconsultation {}
