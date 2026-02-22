import { GastoListadoItem } from '../models/gasto.model';

export const MOCK_GASTOS: GastoListadoItem[] = [
    {
      id: 45, gastoId: 12, fecha: new Date().toISOString().split('T')[0],
      descripcion: 'Netflix', categoria: { id: 5, nombre: 'Entretenimiento', color_hex: '#a855f7', icono: 'film' },
      monto: 3299, moneda: 'ARS',
      tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
      tipo: 'Crédito', esDebitoAuto: true
    },
    {
      id: 46, gastoId: 13, fecha: new Date().toISOString().split('T')[0],
      descripcion: 'Carpintería', categoria: { id: 12, nombre: 'Servicios', color_hex: '#64748b', icono: 'receipt' },
      monto: 200000, moneda: 'ARS',
      tarjeta: { id: 2, nombre: 'Mastercard Black', banco: 'BBVA' },
      tipo: 'Crédito', totalCuotas: 12, cuotaActual: 3, esDebitoAuto: false
    },
    {
      id: 47, gastoId: 14, fecha: new Date().toISOString().split('T')[0],
      descripcion: 'Starbucks', categoria: { id: 4, nombre: 'Comida', color_hex: '#ef4444', icono: 'restaurant' },
      monto: 5500, moneda: 'ARS',
      tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
      tipo: 'Crédito', esDebitoAuto: false
    },
    {
      id: 48, gastoId: 15,
      fecha: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      descripcion: 'Supermercado Carrefour', categoria: { id: 2, nombre: 'Supermercado', color_hex: '#10b981', icono: 'cart' },
      monto: 84200, moneda: 'ARS',
      tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
      tipo: 'Crédito', esDebitoAuto: false
    },
    {
      id: 49, gastoId: 16, fecha: new Date().toISOString().split('T')[0],
      descripcion: 'Nike Store', categoria: { id: 4, nombre: 'Ropa', color_hex: '#f59e0b', icono: 'basket' },
      monto: 129000, moneda: 'ARS',
      tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
      tipo: 'Crédito', esDebitoAuto: false
    },
    {
        id: 50, gastoId: 17, fecha: new Date().toISOString().split('T')[0],
        descripcion: 'Apple Store', categoria: { id: 1, nombre: 'Hogar', color_hex: '#6366f1', icono: 'home' },
        monto: 1000000, moneda: 'ARS',
        tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
        tipo: 'Crédito', totalCuotas: 12, cuotaActual: 4, esDebitoAuto: false
      },
      {
        id: 51, gastoId: 18, fecha: new Date().toISOString().split('T')[0],
        descripcion: 'Despegar.com', categoria: { id: 3, nombre: 'Transporte', color_hex: '#f97316', icono: 'car' },
        monto: 1200000, moneda: 'ARS',
        tarjeta: { id: 1, nombre: 'Visa Signature', banco: 'Banco Galicia' },
        tipo: 'Crédito', totalCuotas: 10, cuotaActual: 8, esDebitoAuto: false
      }
];
