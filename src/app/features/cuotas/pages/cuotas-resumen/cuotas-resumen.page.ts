import { Component, OnInit } from '@angular/core';
import { CuotasService } from '../../services/cuotas.service';
import { ResumenAnualCuotas } from '../../models/cuota.model';

@Component({
  selector: 'app-cuotas-resumen',
  templateUrl: './cuotas-resumen.page.html',
  styleUrls: ['./cuotas-resumen.page.scss'],
  standalone: false,
})
export class CuotasResumenPage implements OnInit {
  resumen: ResumenAnualCuotas | null = null;
  anio = new Date().getFullYear();

  constructor(private cuotasService: CuotasService) {}

  ngOnInit() {
    this.loadResumen();
  }

  loadResumen() {
    this.cuotasService.getResumenAnual(this.anio).subscribe(data => {
      this.resumen = data;
    });
  }
}
