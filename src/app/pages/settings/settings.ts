import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {
  userService = inject(UserService);
  activeTab = signal('profile');

  // Local state for editing
  editFirstName = signal(this.userService.firstName());
  editLastName = signal(this.userService.lastName());
  editEmail = signal(this.userService.email());

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  saveChanges() {
    this.userService.updateProfile(
      this.editFirstName(),
      this.editLastName(),
      this.editEmail()
    );
    // Visual feedback could be added here
  }
}
