import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';
import { 
  GraficoBarrasDto, 
  GraficoTortaDto, 
  GraficoLineaDto, 
  FiltroReportesDto 
} from '../../models/reportes.models';

@Component({
  selector: 'app-reportes-home',
  templateUrl: './reportes-home.page.html',
  styleUrls: ['./reportes-home.page.scss'],
  standalone: false,
})
export class ReportesHomePage implements OnInit {
  loading = false;
  showFilterModal = false;
  
  filtros: FiltroReportesDto = {
    anio: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    tipoGasto: 1
  };

  anios: number[] = [];
  meses = [
    { value: 1, label: 'Ene' }, { value: 2, label: 'Feb' }, { value: 3, label: 'Mar' },
    { value: 4, label: 'Abr' }, { value: 5, label: 'May' }, { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' }, { value: 8, label: 'Ago' }, { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' }, { value: 11, label: 'Nov' }, { value: 12, label: 'Dic' }
  ];

  chartDataGastoCategoria?: GraficoTortaDto;
  chartDataEvolucionMensual?: GraficoLineaDto;
  chartDataGastoPorTarjeta?: GraficoBarrasDto;

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.generateYears();
    this.loadAllReports();
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      this.anios.push(currentYear - i);
    }
  }

  onHeaderFilterChange() {
    this.loadAllReports();
  }

  openFilters() {
    this.showFilterModal = true;
  }

  onFiltrosChange(filtros: FiltroReportesDto) {
    this.filtros = filtros;
    this.loadAllReports();
  }

  loadAllReports() {
    this.loading = true;
    // Simulamos carga para el diseño premium
    setTimeout(() => {
      this.chartDataGastoCategoria = this.getMockTorta();
      this.chartDataEvolucionMensual = this.getMockLinea();
      this.chartDataGastoPorTarjeta = this.getMockBarras();
      this.loading = false;
    }, 800);
  }

  private getMockTorta(): GraficoTortaDto {
    return {
      labels: ['Supermercado', 'Indumentaria', 'Suscripciones', 'Otros'],
      datasets: [{
        label: 'Distribución',
        data: [185, 90, 12.5, 22],
        backgroundColor: ['#10b981', '#f59e0b', '#8b5cf6', '#64748b'],
        borderWidth: 0
      }]
    };
  }

  private getMockLinea(): GraficoLineaDto {
    return {
      labels: ['SEP', 'OCT', 'NOV', 'DIC', 'ENE', 'FEB'],
      datasets: [
        {
          label: 'Cuotas',
          data: [120, 150, 110, 180, 250, 210],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Débitos',
          data: [60, 40, 50, 70, 90, 85],
          borderColor: '#f43f5e',
          backgroundColor: 'rgba(244, 63, 94, 0.15)',
          fill: true,
          tension: 0.4
        }
      ]
    };
  }

  private getMockBarras(): GraficoBarrasDto {
    return {
      labels: ['ENE', 'FEB', 'MAR'],
      datasets: [
        {
          label: 'Visa Signature',
          data: [150, 220, 180],
          backgroundColor: '#3b82f6',
          borderRadius: 8
        },
        {
          label: 'Mastercard Black',
          data: [110, 140, 130],
          backgroundColor: '#f97316',
          borderRadius: 8
        }
      ]
    };
  }
}
