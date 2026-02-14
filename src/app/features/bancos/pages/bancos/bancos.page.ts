import { Component, OnInit } from '@angular/core';
import { BancosService } from '../../services/bancos.service';
import { Banco } from '../../models/banco.model';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.page.html',
  styleUrls: ['./bancos.page.scss'],
  standalone: false,
})
export class BancosPage implements OnInit {
  bancos: Banco[] = [];

  constructor(private bancosService: BancosService) {}

  ngOnInit() {
    this.loadBancos();
  }

  loadBancos() {
    this.bancosService.getBancos().subscribe(data => this.bancos = data);
  }
}
