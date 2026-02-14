import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-gastos-mensuales',
  templateUrl: './reporte-gastos-mensuales.page.html',
  styleUrls: ['./reporte-gastos-mensuales.page.scss'],
  standalone: false,
})
export class ReporteGastosMensualesPage implements OnInit {
  // Chart data placeholders
  chartLabels: string[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May'];
  chartData: number[] = [100, 200, 150, 300, 250];

  constructor() {}

  ngOnInit() {}
}
