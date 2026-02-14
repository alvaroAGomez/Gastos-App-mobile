import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  // Placeholder data
  totalGastosMes: number = 0;
  ultimasTransacciones: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // TODO: Implementar llamada al servicio
    this.totalGastosMes = 15000;
    this.ultimasTransacciones = [
      { descripcion: 'Supermercado', monto: 3500, fecha: new Date() },
      { descripcion: 'Combustible', monto: 2000, fecha: new Date() }
    ];
  }

  async logout() {
    await this.authService.logout();
  }
}
