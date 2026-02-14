export interface Cuota {
  id: number;
  gastoId: number;
  descripcion: string;
  monto: number;
  numeroCuota: number;
  totalCuotas: number;
  fechaVencimiento: string;
  pagada: boolean;
  tarjetaNombre: string;
}

export interface ResumenMensualCuotas {
  mes: number;
  anio: number;
  total: number;
  cuotas: Cuota[];
}

export interface ResumenAnualCuotas {
  anio: number;
  total: number;
  meses: { mes: number; total: number }[];
}
