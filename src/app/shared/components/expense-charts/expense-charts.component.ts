import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { BaseGraficoDto } from '../../../features/reportes/models/reportes.models';

@Component({
  selector: 'app-expense-charts',
  templateUrl: './expense-charts.component.html',
  styleUrls: ['./expense-charts.component.scss'],
  standalone: false,
})
export class ExpenseChartsComponent implements OnChanges {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() chartType: ChartType = 'bar';
  @Input() data?: BaseGraficoDto;
  @Input() labels: string[] = [];
  @Input() datasets: number[] = [];
  @Input() loading: boolean = false;

  public chartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'bottom' }
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['data'] || changes['labels'] || changes['datasets']) && (this.data || this.labels.length > 0)) {
      this.updateChart();
    }
  }

  updateChart() {
    // Priority: Structured Data DTO
    if (this.data) {
      this.chartData = {
        labels: this.data.labels,
        datasets: this.data.datasets.map(ds => ({
          ...ds,
          label: ds.label || ''
        })) as any
      };

      if (this.data.chartOptions) {
        this.chartOptions = {
          ...this.chartOptions,
          ...this.data.chartOptions
        } as any;
      }
    } 
    // Fallback: Legacy Inputs
    else if (this.labels.length > 0) {
      this.chartData = {
        labels: this.labels,
        datasets: [
          {
            data: this.datasets,
            backgroundColor: this.getAutoColors(),
            borderWidth: 1
          }
        ]
      };
    }

    this.chart?.update();
  }

  private getAutoColors(): string[] {
    const defaultColors = [
      'rgba(16, 185, 129, 0.6)', // Emerald
      'rgba(59, 130, 246, 0.6)', // Blue
      'rgba(139, 92, 246, 0.6)', // Purple
      'rgba(245, 158, 11, 0.6)', // Amber
      'rgba(239, 68, 68, 0.6)',  // Red
    ];
    
    if (this.chartType === 'doughnut' || this.chartType === 'pie') {
      return this.labels.map((_, i) => defaultColors[i % defaultColors.length]);
    }
    return [defaultColors[0]];
  }
}
