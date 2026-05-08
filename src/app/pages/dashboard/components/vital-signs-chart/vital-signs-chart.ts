import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-vital-signs-chart',
  standalone: true,
  template: `
    <div class="h-40 relative w-full">
      <canvas #vitalsChart></canvas>
    </div>
    <div class="mt-4 flex justify-between items-center px-2">
      <div class="flex items-center gap-2">
        <div class="w-3 h-3 rounded-full bg-[#10b981] animate-pulse"></div>
        <span class="text-sm font-medium text-gray-500">Live Monitoring Active</span>
      </div>
      <div class="text-right">
        <div class="text-2xl font-bold text-[#134e4a]">72 <span class="text-sm font-medium text-gray-500">BPM</span></div>
        <div class="text-xs text-[#10b981] font-medium">Normal range</div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
  `]
})
export class VitalSignsChart implements AfterViewInit, OnDestroy {
  @ViewChild('vitalsChart') vitalsChartRef!: ElementRef<HTMLCanvasElement>;
  public chart: Chart | undefined;
  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initChart();
      }, 0);
    }
  }

  initChart() {
    if (!this.vitalsChartRef) return;
    const canvas = this.vitalsChartRef.nativeElement;
    if (!canvas) return;

    const dataPoints = Array.from({length: 20}, () => Math.floor(Math.random() * (85 - 65 + 1) + 65));
    const labels = Array.from({length: 20}, (_, i) => `T-${20 - i}`);

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Heart Rate (BPM)',
          data: dataPoints,
          borderColor: '#0891b2',
          backgroundColor: 'rgba(8, 145, 178, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: false },
          y: { 
            min: 50, max: 110,
            grid: { color: 'rgba(148, 163, 184, 0.1)' },
            ticks: { color: '#94a3b8' },
            border: { dash: [4, 4] }
          }
        },
        animation: { duration: 0 }
      }
    };

    this.chart = new Chart(canvas, config);

    this.intervalId = setInterval(() => {
      if (this.chart) {
        const newData = Math.floor(Math.random() * (85 - 65 + 1) + 65);
        this.chart.data.labels?.shift();
        this.chart.data.datasets[0].data.shift();
        this.chart.data.labels?.push('Now');
        this.chart.data.datasets[0].data.push(newData);
        this.chart.update('none');
      }
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.chart) this.chart.destroy();
  }
}
