import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { DashboardSummary, TarjetaDashboard, GastoDashboard } from '../../../../shared/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  summary: DashboardSummary = {
    totalDisponible: 2850000,
    gastosEsteMes: 780000,
    proximoCierre: null
  };

  tarjetas: TarjetaDashboard[] = [
    {
      tarjetaId: 1,
      nombreTarjeta: "Visa Signature",
      ultimos4: "1234",
      banco: "Banco Galicia",
      limiteTotal: 1500000,
      gastosEsteMes: 320000,
      gastosFuturos: 180000,
      limiteDisponible: 1000000,
      porcentajeUso: 33.33,
      fechaCierre: '15/10'
    },
    {
      tarjetaId: 2,
      nombreTarjeta: "Mastercard Black",
      ultimos4: "5678",
      banco: "BBVA",
      limiteTotal: 1000000,
      gastosEsteMes: 250000,
      gastosFuturos: 90000,
      limiteDisponible: 660000,
      porcentajeUso: 34,
      fechaCierre: '20/10'
    }
  ];

  gastos: GastoDashboard[] = [
    {
      id: 101,
      fecha: "2026-02-18",
      descripcion: "Supermercado Carrefour",
      monto: 85420,
      moneda: "ARS",
      categoria: {
        id: 3,
        nombre: "Supermercado",
        color_hex: "#4CAF50",
        icono: "cart"
      },
      tarjeta: {
        id: 1,
        nombre: "Visa Signature",
        banco: { id: 2, nombre: "Banco Galicia" }
      },
      totalCuotas: 3,
      cuotaActual: 1,
      esDebitoAuto: false
    },
    {
      id: 102,
      fecha: "2026-02-10",
      descripcion: "Spotify",
      monto: 3499,
      moneda: "ARS",
      categoria: {
        id: 8,
        nombre: "Suscripciones",
        color_hex: "#9C27B0",
        icono: "musical-notes"
      },
      tarjeta: {
        id: 2,
        nombre: "Mastercard Black",
        banco: { id: 1, nombre: "BBVA" }
      },
      esDebitoAuto: true
    },
    {
      id: 103,
      fecha: "2024-01-25",
      descripcion: "Zapatillas Nike",
      monto: 180000,
      moneda: "ARS",
      categoria: {
        id: 5,
        nombre: "Indumentaria",
        color_hex: "#FF9800",
        icono: "shirt"
      },
      tarjeta: {
        id: 1,
        nombre: "Visa Signature",
        banco: { id: 2, nombre: "Banco Galicia" }
      },
      totalCuotas: 6,
      cuotaActual: 2,
      esDebitoAuto: false
    },    {
      id: 104,
      fecha: "2024-01-25",
      descripcion: "Zapatillas Nike",
      monto: 180000,
      moneda: "ARS",
      categoria: {
        id: 5,
        nombre: "Indumentaria",
        color_hex: "#FF9800",
        icono: "shirt"
      },
      tarjeta: {
        id: 1,
        nombre: "Visa Signature",
        banco: { id: 2, nombre: "Banco Galicia" }
      },
      totalCuotas: 6,
      cuotaActual: 2,
      esDebitoAuto: false
    },    {
      id: 105,
      fecha: "2024-01-25",
      descripcion: "Zapatillas Nike",
      monto: 180000,
      moneda: "ARS",
      categoria: {
        id: 5,
        nombre: "Indumentaria",
        color_hex: "#FF9800",
        icono: "shirt"
      },
      tarjeta: {
        id: 1,
        nombre: "Visa Signature",
        banco: { id: 2, nombre: "Banco Galicia" }
      },
      totalCuotas: 6,
      cuotaActual: 2,
      esDebitoAuto: false
    },    {
      id: 106,
      fecha: "2024-01-25",
      descripcion: "Zapatillas Nike",
      monto: 180000,
      moneda: "ARS",
      categoria: {
        id: 5,
        nombre: "Indumentaria",
        color_hex: "#FF9800",
        icono: "shirt"
      },
      tarjeta: {
        id: 1,
        nombre: "Visa Signature",
        banco: { id: 2, nombre: "Banco Galicia" }
      },
      totalCuotas: 6,
      cuotaActual: 2,
      esDebitoAuto: false
    },    {
      id: 107,
      fecha: "2024-01-25",
      descripcion: "Zapatillas Nike",
      monto: 180000,
      moneda: "ARS",
      categoria: {
        id: 5,
        nombre: "Indumentaria",
        color_hex: "#FF9800",
        icono: "shirt"
      },
      tarjeta: {
        id: 1,
        nombre: "Visa Signature",
        banco: { id: 2, nombre: "Banco Galicia" }
      },
      totalCuotas: 6,
      cuotaActual: 2,
      esDebitoAuto: false
    },    {
      id: 108,
      fecha: "2024-01-25",
      descripcion: "Zapatillas Nike",
      monto: 180000,
      moneda: "ARS",
      categoria: {
        id: 5,
        nombre: "Indumentaria",
        color_hex: "#FF9800",
        icono: "shirt"
      },
      tarjeta: {
        id: 1,
        nombre: "Visa Signature",
        banco: { id: 2, nombre: "Banco Galicia" }
      },
      totalCuotas: 6,
      cuotaActual: 2,
      esDebitoAuto: false
    },    {
      id: 109,
      fecha: "2024-01-25",
      descripcion: "Zapatillas Nike",
      monto: 180000,
      moneda: "ARS",
      categoria: {
        id: 5,
        nombre: "Indumentaria",
        color_hex: "#FF9800",
        icono: "shirt"
      },
      tarjeta: {
        id: 1,
        nombre: "Visa Signature",
        banco: { id: 2, nombre: "Banco Galicia" }
      },
      totalCuotas: 6,
      cuotaActual: 2,
      esDebitoAuto: false
    }
  ];

  userName: string = 'Álvaro';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // La data ya está inicializada con el mock
  }

  async logout() {
    await this.authService.logout();
  }
}
