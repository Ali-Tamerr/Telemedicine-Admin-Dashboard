import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Topbar } from './layout/topbar/topbar';
import { AppModule } from './app-module';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Topbar, AppModule],
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('anglularTest');
}
