import { TarjetaCredito, TarjetaDebito } from '../models/tarjeta.model';

export const MOCK_TARJETAS_CREDITO: TarjetaCredito[] = [
  {
    id: 1,
    nombre: 'Visa Platinum',
    banco: 'BBVA',
    ultimosDigitos: '4589',
    diaCierre: 15,
    diaVencimiento: 4,
    cupoTotal: 500000,
    cupoDisponible: 120000,
    gastosMesActual: 380000,
    color: '#1a1a2b'
  },
  {
    id: 2,
    nombre: 'Mastercard Gold',
    banco: 'Galicia',
    ultimosDigitos: '9021',
    diaCierre: 28,
    diaVencimiento: 10,
    cupoTotal: 800000,
    cupoDisponible: 600000,
    gastosMesActual: 200000,
    color: '#2a1a1a'
  },
  {
    id: 3,
    nombre: 'Nu Standard',
    banco: 'Nu',
    ultimosDigitos: '1234',
    diaCierre: 5,
    diaVencimiento: 15,
    cupoTotal: 150000,
    cupoDisponible: 140000,
    gastosMesActual: 10000,
    color: '#3a0a4a'
  }
];

export const MOCK_TARJETAS_DEBITO: TarjetaDebito[] = [
  {
    id: 101,
    nombre: 'Débito Principal',
    banco: 'BBVA',
    ultimosDigitos: '8822',
    saldo: 45000,
    color: '#1a1a2b'
  }
];
