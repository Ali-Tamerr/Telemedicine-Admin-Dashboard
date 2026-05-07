import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { PatientList } from './pages/patient-list/patient-list';
import { PatientDetails } from './pages/patient-details/patient-details';
import { PatientAdd } from './pages/patient-add/patient-add';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'patients', component: PatientList },
  { path: 'patients/add', component: PatientAdd },
  { path: 'patients/:id', component: PatientDetails }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
