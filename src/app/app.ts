import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Topbar } from './layout/topbar/topbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Topbar],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('anglularTest');
}
