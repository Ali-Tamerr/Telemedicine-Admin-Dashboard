import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientDetails } from './pages/patient-details/patient-details';
import { PatientAdd } from './pages/patient-add/patient-add';
import { Appointments } from './pages/appointments/appointments';
import { AppointmentAdd } from './pages/appointment-add/appointment-add';
import { Teleconsultation } from './pages/teleconsultation/teleconsultation';
import { Reports } from './pages/reports/reports';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'patients', component: PatientList },
  { path: 'patients/add', component: PatientAdd },
  { path: 'patients/:id', component: PatientDetails },
  { path: 'appointments', component: Appointments },
  { path: 'appointments/book', component: AppointmentAdd },
  { path: 'consultations', component: Teleconsultation },
  { path: 'reports', component: Reports },
  { path: 'settings', component: Settings }
];
