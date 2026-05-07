import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Sidebar } from './layout/sidebar/sidebar';
import { Topbar } from './layout/topbar/topbar';
import { Dashboard } from './pages/dashboard/dashboard';
import { PatientStatsCard } from './pages/dashboard/components/patient-stats-card/patient-stats-card';
import { AppointmentCalendar } from './pages/dashboard/components/appointment-calendar/appointment-calendar';
import { RecentActivityFeed } from './pages/dashboard/components/recent-activity-feed/recent-activity-feed';
import { VitalSignsChart } from './pages/dashboard/components/vital-signs-chart/vital-signs-chart';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientDetails } from './pages/patient-details/patient-details';
import { PatientAdd } from './pages/patient-add/patient-add';
import { Appointments } from './pages/appointments/appointments';
import { Teleconsultation } from './pages/teleconsultation/teleconsultation';
import { Reports } from './pages/reports/reports';
import { Settings } from './pages/settings/settings';

@NgModule({
  declarations: [
    App,
    Sidebar,
    Topbar,
    Dashboard,
    PatientStatsCard,
    AppointmentCalendar,
    RecentActivityFeed,
    VitalSignsChart,
    PatientList,
    PatientDetails,
    PatientAdd,
    Appointments,
    Teleconsultation,
    Reports,
    Settings,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule {}
