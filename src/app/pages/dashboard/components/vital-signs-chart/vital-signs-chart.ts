import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-vital-signs-chart',
  standalone: false,
  templateUrl: './vital-signs-chart.html',
  styleUrl: './vital-signs-chart.css',
})
export class VitalSignsChart implements AfterViewInit, OnDestroy {
  @ViewChild('vitalsChart') vitalsChartRef!: ElementRef<HTMLCanvasElement>;
  public chart: Chart | undefined;
  private intervalId: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initChart();
    }
  }

  initChart() {
    const canvas = this.vitalsChartRef.nativeElement;
    if (!canvas) return;

    // Initial dummy data
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
          pointRadius: 0,
          pointHitRadius: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          }
        },
        scales: {
          x: {
            display: false // hide x axis
          },
          y: {
            min: 50,
            max: 110,
            grid: {
              color: '#f1f5f9'
            },
            border: {
              dash: [4, 4]
            }
          }
        },
        animation: {
          duration: 0 // turn off animation for real-time feel
        }
      }
    };

    this.chart = new Chart(canvas, config);

    // Simulate real-time updates
    this.intervalId = setInterval(() => {
      if (this.chart) {
        const newData = Math.floor(Math.random() * (85 - 65 + 1) + 65);
        
        // Remove oldest
        this.chart.data.labels?.shift();
        this.chart.data.datasets[0].data.shift();
        
        // Add newest
        this.chart.data.labels?.push('Now');
        this.chart.data.datasets[0].data.push(newData);
        
        this.chart.update('none'); // Update without animation
      }
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
