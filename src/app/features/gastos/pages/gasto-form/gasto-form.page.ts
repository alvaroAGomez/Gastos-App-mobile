import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.page.html',
  styleUrls: ['./gasto-form.page.scss'],
  standalone: false,
})
export class GastoFormPage implements OnInit {
  isEditMode = false;
  gastoId: number | null = null;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.gastoId = +id;
    }
  }
}
