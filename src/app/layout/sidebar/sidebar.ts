import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private router = inject(Router);
  layoutService = inject(LayoutService);

  testNavigate(path: string, event: Event) {
    event.preventDefault();
    console.log('Navigating to:', path);
    this.router.navigate([path]);
  }
}
