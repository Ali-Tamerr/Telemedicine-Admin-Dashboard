import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList {
  searchQuery = signal('');
  selectedPatient = signal<any>(null);
  showViewModal = signal(false);

  patients = [
    {
      id: '#P-0042',
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      age: 28,
      gender: 'Female',
      lastVisit: 'May 12, 2026',
      status: 'Active',
      initials: 'JD',
      colorClass: 'bg-primary/10 text-primary',
      phone: '+1 (555) 012-3456',
      address: '123 Medical Dr, Springfield, IL'
    },
    {
      id: '#P-0085',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      age: 45,
      gender: 'Male',
      lastVisit: 'May 10, 2026',
      status: 'Pending',
      initials: 'BS',
      colorClass: 'bg-warning/10 text-warning',
      phone: '+1 (555) 987-6543',
      address: '456 Healthcare Ln, Metropolis, NY'
    },
    {
      id: '#P-0122',
      name: 'Robert Taylor',
      email: 'robert.t@example.com',
      age: 62,
      gender: 'Male',
      lastVisit: 'May 08, 2026',
      status: 'Critical',
      initials: 'RT',
      colorClass: 'bg-danger/10 text-danger',
      phone: '+1 (555) 444-5555',
      address: '789 Wellness Way, Gotham, NJ'
    }
  ];

  filteredPatients = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.patients;
    return this.patients.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.email.toLowerCase().includes(query) || 
      p.id.toLowerCase().includes(query)
    );
  });

  viewPatient(patient: any) {
    this.selectedPatient.set(patient);
    this.showViewModal.set(true);
  }

  closeModal() {
    this.showViewModal.set(false);
    setTimeout(() => this.selectedPatient.set(null), 300);
  }
}
