export interface TarjetaCredito {
  id: number;
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  diaCierre: number;
  diaVencimiento: number;
  cupoTotal: number;
  cupoDisponible: number;
  color?: string;
  gastosMesActual?: number;
}

export interface TarjetaDebito {
  id: number;
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  saldo: number;
  color?: string;
}

export interface CreateTarjetaCreditoDto {
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  diaCierre: number;
  diaVencimiento: number;
  cupoTotal: number;
  color?: string;
}

export interface CreateTarjetaDebitoDto {
  nombre: string;
  banco: string;
  ultimosDigitos: string;
  saldoInicial: number;
  color?: string;
}
