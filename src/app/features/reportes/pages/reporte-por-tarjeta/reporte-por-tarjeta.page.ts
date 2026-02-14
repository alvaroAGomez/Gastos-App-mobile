import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-por-tarjeta',
  templateUrl: './reporte-por-tarjeta.page.html',
  styleUrls: ['./reporte-por-tarjeta.page.scss'],
  standalone: false,
})
export class ReportePorTarjetaPage implements OnInit {
  // Chart data placeholders
  chartLabels: string[] = ['Visa', 'Mastercard', 'Amex'];
  chartData: number[] = [500, 300, 100];

  constructor() {}

  ngOnInit() {}
}
