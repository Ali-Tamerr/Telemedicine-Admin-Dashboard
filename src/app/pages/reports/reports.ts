import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-reports',
  standalone: true,
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements AfterViewInit, OnDestroy {
  @ViewChild('revenueChartCanvas') revenueChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('departmentChartCanvas') departmentChartRef!: ElementRef<HTMLCanvasElement>;

  private revenueChart?: Chart;
  private departmentChart?: Chart;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initRevenueChart();
        this.initDepartmentChart();
      }, 0);
    }
  }

  private initRevenueChart() {
    if (!this.revenueChartRef) return;
    const canvas = this.revenueChartRef.nativeElement;
    if (!canvas) return;

    if (this.revenueChart) {
      this.revenueChart.destroy();
    }

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue ($)',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
          borderColor: '#0891b2',
          backgroundColor: 'rgba(8, 145, 178, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(148, 163, 184, 0.1)' },
            ticks: { color: '#94a3b8' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    };

    this.revenueChart = new Chart(canvas, config);
  }

  private initDepartmentChart() {
    if (!this.departmentChartRef) return;
    const canvas = this.departmentChartRef.nativeElement;
    if (!canvas) return;

    if (this.departmentChart) {
      this.departmentChart.destroy();
    }

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General'],
        datasets: [{
          data: [35, 20, 15, 20, 10],
          backgroundColor: [
            '#0891b2',
            '#0ea5e9',
            '#22d3ee',
            '#67e8f9',
            '#cffafe'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 12,
              usePointStyle: true,
              color: '#94a3b8'
            }
          }
        }
      }
    };

    this.departmentChart = new Chart(canvas, config);
  }

  ngOnDestroy() {
    if (this.revenueChart) {
      this.revenueChart.destroy();
    }
    if (this.departmentChart) {
      this.departmentChart.destroy();
    }
  }
}
