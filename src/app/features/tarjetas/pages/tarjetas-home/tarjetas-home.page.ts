import { Component, OnInit } from '@angular/core';
import { TarjetasCreditoService } from '../../services/tarjetas-credito.service';
import { TarjetasDebitoService } from '../../services/tarjetas-debito.service';
import { TarjetaCredito, TarjetaDebito } from '../../models/tarjeta.model';

@Component({
  selector: 'app-tarjetas-home',
  templateUrl: './tarjetas-home.page.html',
  styleUrls: ['./tarjetas-home.page.scss'],
  standalone: false,
})
export class TarjetasHomePage implements OnInit {
  segment: 'credito' | 'debito' = 'credito';
  tarjetasCredito: TarjetaCredito[] = [];
  tarjetasDebito: TarjetaDebito[] = [];

  constructor(
    private tcService: TarjetasCreditoService,
    private tdService: TarjetasDebitoService
  ) {}

  ngOnInit() {
    this.loadTarjetas();
  }

  loadTarjetas() {
    // TODO: Implement loading
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }
}
