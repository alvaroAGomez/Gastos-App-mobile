export interface Gasto {
  id: number;
  monto: number;
  descripcion: string;
  fecha: string;
  tarjetaId?: number;
  tarjetaNombre?: string;
  categoriaId: number;
  categoriaNombre: string;
  cuotas: number;
  cuotaActual: number;
}

export interface CreateGastoDto {
  monto: number;
  descripcion: string;
  fecha: string;
  tarjetaId?: number;
  categoriaId: number;
  cuotas: number;
}

export interface UpdateGastoDto extends Partial<CreateGastoDto> {}

export interface GastosFiltro {
  page: number;
  size: number;
  tarjetaId?: number;
  categoriaId?: number;
  desde?: string;
  hasta?: string;
}
