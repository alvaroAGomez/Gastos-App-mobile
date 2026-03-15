import { TarjetaCredito, TarjetaDebito } from '../models/tarjeta.model';

export const MOCK_TARJETAS_CREDITO: TarjetaCredito[] = [
  {
    id: 1,
    nombreTarjeta: 'Visa Platinum',
    numeroTarjeta: '**** **** **** 4589',
    banco: { id: 1, nombre: 'BBVA' },
    diaCierre: 15,
    diaVencimiento: 4,
    limiteCredito: 500000,
    limiteDisponible: 120000,
    gastoActual: 380000,
    cierreActual: '2026-03-15',
    vencimientoActual: '2026-04-04',
    color: '#1a1a2b'
  },
  {
    id: 2,
    nombreTarjeta: 'Mastercard Gold',
    numeroTarjeta: '**** **** **** 9021',
    banco: { id: 2, nombre: 'Galicia' },
    diaCierre: 28,
    diaVencimiento: 10,
    limiteCredito: 800000,
    limiteDisponible: 600000,
    gastoActual: 200000,
    cierreActual: '2026-03-28',
    vencimientoActual: '2026-04-10',
    color: '#2a1a1a'
  },
  {
    id: 3,
    nombreTarjeta: 'Nu Standard',
    numeroTarjeta: '**** **** **** 1234',
    banco: { id: 3, nombre: 'Nu' },
    diaCierre: 5,
    diaVencimiento: 15,
    limiteCredito: 150000,
    limiteDisponible: 140000,
    gastoActual: 10000,
    cierreActual: '2026-04-05',
    vencimientoActual: '2026-04-15',
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
