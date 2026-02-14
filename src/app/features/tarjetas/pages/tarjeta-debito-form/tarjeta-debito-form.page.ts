import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarjeta-debito-form',
  templateUrl: './tarjeta-debito-form.page.html',
  styleUrls: ['./tarjeta-debito-form.page.scss'],
  standalone: false,
})
export class TarjetaDebitoFormPage implements OnInit {
  isEditMode = false;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.isEditMode = true;
  }
}
