import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporte-por-categoria',
  templateUrl: './reporte-por-categoria.page.html',
  styleUrls: ['./reporte-por-categoria.page.scss'],
  standalone: false,
})
export class ReportePorCategoriaPage implements OnInit {
  // Chart data placeholders
  chartLabels: string[] = ['Comida', 'Transporte', 'Hogar', 'Ocio'];
  chartData: number[] = [300, 150, 450, 200];

  constructor() {}

  ngOnInit() {}
}
