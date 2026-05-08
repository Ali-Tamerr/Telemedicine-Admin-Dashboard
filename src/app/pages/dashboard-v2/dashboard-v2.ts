import { Component, signal } from '@angular/core';
import { PatientStatsCard } from '../dashboard/components/patient-stats-card/patient-stats-card';
import { AppointmentCalendar } from '../dashboard/components/appointment-calendar/appointment-calendar';
import { RecentActivityFeed } from '../dashboard/components/recent-activity-feed/recent-activity-feed';
import { AnalyticsChart } from '../dashboard/components/analytics-chart/analytics-chart';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-v2',
  standalone: true,
  imports: [
    CommonModule,
    PatientStatsCard,
    AppointmentCalendar,
    RecentActivityFeed,
    AnalyticsChart
  ],
  templateUrl: './dashboard-v2.html',
  styleUrl: './dashboard-v2.css',
})
export class DashboardV2 {
  showActivityModal = signal(false);

  openActivityModal() {
    this.showActivityModal.set(true);
  }

  closeActivityModal() {
    this.showActivityModal.set(false);
  }
}
