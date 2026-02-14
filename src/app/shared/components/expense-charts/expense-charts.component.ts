import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Registrar elementos de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-expense-charts',
  templateUrl: './expense-charts.component.html',
  styleUrls: ['./expense-charts.component.scss'],
  standalone: false,
})
export class ExpenseChartsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() chartType: ChartType = 'bar';
  @Input() labels: string[] = [];
  @Input() datasets: number[] = [];
  @Input() title?: string;
  @Input() showLegend: boolean = true;

  public chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    this.chartData = {
      labels: this.labels,
      datasets: [
        {
          label: this.title || 'Datos',
          data: this.datasets,
          backgroundColor: this.getBackgroundColors(),
          borderColor: this.getBorderColors(),
          borderWidth: 1
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: this.showLegend
        },
        title: {
          display: !!this.title,
          text: this.title || ''
        }
      }
    };

    this.chart?.update();
  }

  private getBackgroundColors(): string[] {
    const colors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(199, 199, 199, 0.6)',
      'rgba(83, 102, 255, 0.6)',
      'rgba(255, 102, 146, 0.6)',
      'rgba(102, 255, 178, 0.6)'
    ];

    if (this.chartType === 'doughnut' || this.chartType === 'pie') {
      return colors.slice(0, this.labels.length);
    }
    return [colors[0]];
  }

  private getBorderColors(): string[] {
    const colors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(199, 199, 199, 1)',
      'rgba(83, 102, 255, 1)',
      'rgba(255, 102, 146, 1)',
      'rgba(102, 255, 178, 1)'
    ];

    if (this.chartType === 'doughnut' || this.chartType === 'pie') {
      return colors.slice(0, this.labels.length);
    }
    return [colors[0]];
  }

  refresh() {
    this.updateChart();
  }
}
