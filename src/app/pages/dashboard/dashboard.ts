import { Component } from '@angular/core';
import { PatientStatsCard } from './components/patient-stats-card/patient-stats-card';
import { AppointmentCalendar } from './components/appointment-calendar/appointment-calendar';
import { RecentActivityFeed } from './components/recent-activity-feed/recent-activity-feed';
import { VitalSignsChart } from './components/vital-signs-chart/vital-signs-chart';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PatientStatsCard,
    AppointmentCalendar,
    RecentActivityFeed,
    VitalSignsChart
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
