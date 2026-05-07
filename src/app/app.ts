import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Topbar } from './layout/topbar/topbar';
import { ThemeService } from './services/theme.service';
import { LayoutService } from './services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Topbar],
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('anglularTest');
  themeService = inject(ThemeService);
  layoutService = inject(LayoutService);

  ngOnInit() {
    this.themeService.applyTheme();
  }
}
