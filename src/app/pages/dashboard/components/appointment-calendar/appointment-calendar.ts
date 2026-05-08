import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-calendar',
  standalone: true,
  templateUrl: './appointment-calendar.html',
  styleUrl: './appointment-calendar.css',
})
export class AppointmentCalendar implements OnInit {
  currentDayIndex: number = 0; // 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri

  ngOnInit() {
    const today = new Date().getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    
    // Map Sunday/Saturday to 0 (no "Today" badge)
    // Map Monday-Friday to 1-5
    if (today >= 1 && today <= 5) {
      this.currentDayIndex = today;
    } else {
      this.currentDayIndex = 0;
    }
  }
}
