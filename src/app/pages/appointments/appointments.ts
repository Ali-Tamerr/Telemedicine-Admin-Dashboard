import { Component } from '@angular/core';
import { AppointmentCalendar } from '../dashboard/components/appointment-calendar/appointment-calendar';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [AppointmentCalendar],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class Appointments {}
