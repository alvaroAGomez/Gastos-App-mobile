export interface ReportesFiltro {
  anio?: number;
  mes?: number;
  desde?: string;
  hasta?: string;
  tarjetaId?: number;
  categoriaId?: number;
  agrupacion?: 'dia' | 'semana' | 'mes';
}
