import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  themeService = inject(ThemeService);
}
