import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gasto-detalle',
  templateUrl: './gasto-detalle.page.html',
  styleUrls: ['./gasto-detalle.page.scss'],
  standalone: false,
})
export class GastoDetallePage implements OnInit {
  gastoId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.gastoId = +id;
  }
}
