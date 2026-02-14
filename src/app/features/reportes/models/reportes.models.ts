export interface ReporteSerieDto {
  labels: string[];
  data: number[];
}

export interface ReporteTotalesDto {
  nombre: string;
  total: number;
}

export interface ReporteResumenMensualDto {
  mes: number;
  total: number;
}

export interface ReporteResumenAnualDto {
  meses: { mes: number; total: number; }[];
  totalAnual: number;
}
