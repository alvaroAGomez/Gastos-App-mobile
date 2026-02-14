import { Component, OnInit } from '@angular/core';
import { CuotasService } from '../../services/cuotas.service';
import { Cuota } from '../../models/cuota.model';

@Component({
  selector: 'app-cuotas-pendientes',
  templateUrl: './cuotas-pendientes.page.html',
  styleUrls: ['./cuotas-pendientes.page.scss'],
  standalone: false,
})
export class CuotasPendientesPage implements OnInit {
  cuotas: Cuota[] = [];
  loading = false;

  constructor(private cuotasService: CuotasService) {}

  ngOnInit() {
    this.loadCuotas();
  }

  loadCuotas() {
    this.loading = true;
    this.cuotasService.getCuotasPendientes().subscribe({
      next: (data) => {
        this.cuotas = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
