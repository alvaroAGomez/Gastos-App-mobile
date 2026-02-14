import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarjeta-credito-detalle',
  templateUrl: './tarjeta-credito-detalle.page.html',
  styleUrls: ['./tarjeta-credito-detalle.page.scss'],
  standalone: false,
})
export class TarjetaCreditoDetallePage implements OnInit {
  tarjetaId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.tarjetaId = +id;
  }
}
