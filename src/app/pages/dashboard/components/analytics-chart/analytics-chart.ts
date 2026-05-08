import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-analytics-chart',
  standalone: true,
  template: `
    <div class="h-56 relative w-full">
      <canvas #analyticsChart></canvas>
    </div>
    <div class="mt-4 flex justify-between items-center px-2">
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-gray-500">Total Monthly Consultations: 245</span>
      </div>
      <div class="text-right">
        <div class="text-xs text-[#10b981] font-medium">+12.5% from last month</div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
  `]
})
export class AnalyticsChart implements AfterViewInit, OnDestroy {
  @ViewChild('analyticsChart') analyticsChartRef!: ElementRef<HTMLCanvasElement>;
  public chart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Use setTimeout to ensure the view is stable and ViewChild is populated
      setTimeout(() => {
        this.initChart();
      }, 0);
    }
  }

  initChart() {
    if (!this.analyticsChartRef) {
      console.error('Analytics chart canvas ref not found');
      return;
    }

    const canvas = this.analyticsChartRef.nativeElement;
    if (!canvas) return;

    const labels = ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General', 'Dermatology'];
    const dataPoints = [45, 32, 58, 24, 67, 19];

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Consultations',
          data: dataPoints,
          backgroundColor: [
            'rgba(8, 145, 178, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(99, 102, 241, 0.7)',
            'rgba(168, 85, 247, 0.7)'
          ],
          borderColor: [
            '#0891b2',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#6366f1',
            '#a855f7'
          ],
          borderWidth: 1,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1e293b',
            padding: 10
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
          y: { 
            beginAtZero: true, 
            grid: { color: 'rgba(148, 163, 184, 0.1)' },
            ticks: { color: '#94a3b8' },
            border: { dash: [4, 4] }
          }
        }
      }
    };

    this.chart = new Chart(canvas, config);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
