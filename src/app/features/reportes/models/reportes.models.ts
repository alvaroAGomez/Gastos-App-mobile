export interface DatasetDto {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  borderRadius?: number | any;
  fill?: boolean;
  pointRadius?: number;
  tension?: number;
}

export interface ChartOptionsDto {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    title?: {
      display?: boolean;
      text?: string;
    };
  };
  scales?: {
    y?: {
      beginAtZero?: boolean;
    };
  };
}

export interface BaseGraficoDto {
  labels: string[];
  datasets: DatasetDto[];
  chartOptions?: ChartOptionsDto;
}

export interface GraficoBarrasDto extends BaseGraficoDto {}
export interface GraficoTortaDto extends BaseGraficoDto {}
export interface GraficoLineaDto extends BaseGraficoDto {}

export interface FiltroReportesDto {
  anio?: number;
  mes?: number;
  tarjetaIds?: number[];
  categoriaIds?: number[];
  tipoGasto?: number; // 1: Normal, 2: Cuotas, 3: Recurrente, 4: Débito Automático
  fechaDesde?: string;
  fechaHasta?: string;
  meses?: number;
}
