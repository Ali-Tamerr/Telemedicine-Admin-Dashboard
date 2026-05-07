import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  themeService = inject(ThemeService);
  layoutService = inject(LayoutService);
  showNotifications = signal(false);

  notifications = [
    { id: 1, title: 'New Appointment', message: 'Michael Brown scheduled for 2:00 PM', time: '5m ago', unread: true },
    { id: 2, title: 'Vitals Alert', message: 'Abnormal heart rate detected for Robert Taylor', time: '1h ago', unread: true },
    { id: 3, title: 'System Update', message: 'MediAdmin v2.4 successfully deployed', time: '3h ago', unread: false },
  ];

  toggleNotifications() {
    this.showNotifications.set(!this.showNotifications());
  }
}
