import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ConsultationQueueItem {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  initials: string;
  colorClass: string;
  complaint: string;
  triage: 'Urgent' | 'Routine' | 'Follow-up';
  waitTime: string;
  status: 'Waiting' | 'In Progress' | 'Completed';
  doctor: string;
  vitals: {
    bp: string;
    hr: number;
    temp: string;
    spo2: string;
  };
  history: string;
}

@Component({
  selector: 'app-teleconsultation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teleconsultation.html',
  styleUrl: './teleconsultation.css',
})
export class Teleconsultation {
  activeTab = signal<'all' | 'waiting' | 'in-progress' | 'completed'>('all');
  searchQuery = signal('');

  // Call modal states
  showCallModal = signal(false);
  selectedPatient = signal<ConsultationQueueItem | null>(null);
  isMuted = signal(false);
  isVideoOff = signal(false);
  callDuration = signal('12:45');
  activeCallTab = signal<'vitals' | 'chat' | 'notes'>('vitals');

  // Chat in Call
  chatMessages = signal([
    { sender: 'Patient', text: 'Hello Doctor, I am feeling a bit dizzy today.', time: '12:35 PM' },
    { sender: 'Doctor', text: 'Hi Robert, I see your BP reading is 155/95. Have you taken your Lisinopril today?', time: '12:36 PM' },
    { sender: 'Patient', text: 'I missed my morning dose by mistake.', time: '12:37 PM' }
  ]);
  newChatMessage = signal('');

  // New consultation modal state
  showNewConsultationModal = signal(false);
  newPatientName = signal('');
  newComplaint = signal('');
  newTriage = signal<'Urgent' | 'Routine' | 'Follow-up'>('Routine');

  queueList = signal<ConsultationQueueItem[]>([
    {
      id: 'Q-101',
      patientName: 'Robert Taylor',
      patientId: '#P-0122',
      age: 62,
      gender: 'Male',
      initials: 'RT',
      colorClass: 'bg-danger/10 text-danger border-danger/20',
      complaint: 'Elevated BP & Sudden Dizziness',
      triage: 'Urgent',
      waitTime: '14 mins',
      status: 'Waiting',
      doctor: 'Dr. Sarah Jenkins',
      vitals: { bp: '155/95', hr: 92, temp: '98.6°F', spo2: '97%' },
      history: 'Hypertension history. Prescribed Lisinopril 10mg.'
    },
    {
      id: 'Q-102',
      patientName: 'Emma Wilson',
      patientId: '#P-0042',
      age: 28,
      gender: 'Female',
      initials: 'EW',
      colorClass: 'bg-primary/10 text-primary border-primary/20',
      complaint: 'Post-Op Wound Healing Check',
      triage: 'Routine',
      waitTime: '6 mins',
      status: 'In Progress',
      doctor: 'Dr. Sarah Jenkins',
      vitals: { bp: '118/75', hr: 74, temp: '98.4°F', spo2: '99%' },
      history: 'Appendectomy 2 weeks ago. Healing cleanly.'
    },
    {
      id: 'Q-103',
      patientName: 'Bob Smith',
      patientId: '#P-0085',
      age: 45,
      gender: 'Male',
      initials: 'BS',
      colorClass: 'bg-warning/10 text-warning border-warning/20',
      complaint: 'Diabetes Type-2 Routine Review',
      triage: 'Follow-up',
      waitTime: '2 mins',
      status: 'Waiting',
      doctor: 'Dr. Alex Rivera',
      vitals: { bp: '124/80', hr: 78, temp: '98.7°F', spo2: '98%' },
      history: 'Metformin 500mg daily. Last A1C: 6.8.'
    },
    {
      id: 'Q-104',
      patientName: 'Sarah Davis',
      patientId: '#P-0155',
      age: 34,
      gender: 'Female',
      initials: 'SD',
      colorClass: 'bg-primary/10 text-primary border-primary/20',
      complaint: 'Asthma Inhaler Refill & Wheezing',
      triage: 'Routine',
      waitTime: 'Just now',
      status: 'Waiting',
      doctor: 'Dr. Sarah Jenkins',
      vitals: { bp: '112/70', hr: 68, temp: '98.2°F', spo2: '99%' },
      history: 'Seasonal asthma. Albuterol inhaler PRN.'
    }
  ]);

  filteredQueue = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const tab = this.activeTab();

    return this.queueList().filter(item => {
      const matchesSearch = item.patientName.toLowerCase().includes(query) ||
                            item.patientId.toLowerCase().includes(query) ||
                            item.complaint.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      if (tab === 'waiting') return item.status === 'Waiting';
      if (tab === 'in-progress') return item.status === 'In Progress';
      if (tab === 'completed') return item.status === 'Completed';

      return true;
    });
  });

  waitingCount = computed(() => this.queueList().filter(i => i.status === 'Waiting').length);
  inProgressCount = computed(() => this.queueList().filter(i => i.status === 'In Progress').length);
  completedCount = computed(() => 14);

  startCall(item: ConsultationQueueItem) {
    this.selectedPatient.set(item);
    this.showCallModal.set(true);
    this.isMuted.set(false);
    this.isVideoOff.set(false);
  }

  closeCallModal() {
    this.showCallModal.set(false);
    this.selectedPatient.set(null);
  }

  toggleMute() {
    this.isMuted.set(!this.isMuted());
  }

  toggleVideo() {
    this.isVideoOff.set(!this.isVideoOff());
  }

  sendChatMessage() {
    const text = this.newChatMessage().trim();
    if (!text) return;
    this.chatMessages.update(msgs => [
      ...msgs,
      { sender: 'Doctor', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    this.newChatMessage.set('');
  }

  openNewConsultationModal() {
    this.showNewConsultationModal.set(true);
  }

  closeNewConsultationModal() {
    this.showNewConsultationModal.set(false);
    this.newPatientName.set('');
    this.newComplaint.set('');
  }

  addConsultationToQueue() {
    if (!this.newPatientName().trim() || !this.newComplaint().trim()) return;

    const initials = this.newPatientName().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PT';
    const newItem: ConsultationQueueItem = {
      id: `Q-${Math.floor(100 + Math.random() * 900)}`,
      patientName: this.newPatientName().trim(),
      patientId: `#P-${Math.floor(1000 + Math.random() * 9000)}`,
      age: 30 + Math.floor(Math.random() * 30),
      gender: Math.random() > 0.5 ? 'Female' : 'Male',
      initials,
      colorClass: this.newTriage() === 'Urgent' ? 'bg-danger/10 text-danger border-danger/20' : 'bg-primary/10 text-primary border-primary/20',
      complaint: this.newComplaint().trim(),
      triage: this.newTriage(),
      waitTime: 'Just now',
      status: 'Waiting',
      doctor: 'Dr. Sarah Jenkins',
      vitals: { bp: '120/80', hr: 72, temp: '98.6°F', spo2: '99%' },
      history: 'New consultation intake.'
    };

    this.queueList.update(list => [newItem, ...list]);
    this.closeNewConsultationModal();
  }
}
