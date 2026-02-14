import { Component, OnInit } from '@angular/core';
import { GastosService } from '../../services/gastos.service';
import { Gasto } from '../../models/gasto.model';

@Component({
  selector: 'app-gastos-listado',
  templateUrl: './gastos-listado.page.html',
  styleUrls: ['./gastos-listado.page.scss'],
  standalone: false,
})
export class GastosListadoPage implements OnInit {
  gastos: Gasto[] = [];
  loading = false;

  constructor(private gastosService: GastosService) {}

  ngOnInit() {
    this.loadGastos();
  }

  loadGastos() {
    this.loading = true;
    this.gastosService.getGastosPaginados({ page: 1, size: 20 }).subscribe({
      next: (response) => {
        this.gastos = response.items;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
