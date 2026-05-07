import { Component, inject, signal, computed } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { LayoutService } from '../../services/layout.service';
import { SearchService } from '../../services/search.service';
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
  searchService = inject(SearchService);
  showNotifications = signal(false);

  get searchQuery() { return this.searchService.query(); }
  set searchQuery(val: string) { this.searchService.setQuery(val); }

  notifications = [
    { id: 1, title: 'New Appointment', message: 'Michael Brown scheduled for 2:00 PM', time: '5m ago', unread: true },
    { id: 2, title: 'Vitals Alert', message: 'Abnormal heart rate detected for Robert Taylor', time: '1h ago', unread: true },
    { id: 3, title: 'System Update', message: 'MediAdmin v2.4 successfully deployed', time: '3h ago', unread: false },
  ];

  // Mock data for search
  private searchableItems = [
    { type: 'Patient', name: 'Emma Wilson', detail: 'ID: #45821' },
    { type: 'Patient', name: 'Michael Brown', detail: 'ID: #45822' },
    { type: 'Patient', name: 'Robert Taylor', detail: 'ID: #45823' },
    { type: 'Appointment', name: 'J. Smith', detail: 'General Checkup - 09:00 AM' },
    { type: 'Appointment', name: 'A. Davis', detail: 'Follow up - 09:00 AM' },
    { type: 'Report', name: 'Monthly Revenue', detail: 'Updated 2h ago' },
  ];

  filteredResults = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query || query.length < 2) return [];
    return this.searchableItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.type.toLowerCase().includes(query)
    ).slice(0, 5);
  });

  toggleNotifications() {
    this.showNotifications.set(!this.showNotifications());
  }
}
