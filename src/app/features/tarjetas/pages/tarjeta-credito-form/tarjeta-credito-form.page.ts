import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarjeta-credito-form',
  templateUrl: './tarjeta-credito-form.page.html',
  styleUrls: ['./tarjeta-credito-form.page.scss'],
  standalone: false,
})
export class TarjetaCreditoFormPage implements OnInit {
  isEditMode = false;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.isEditMode = true;
  }
}
