import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: false,
})
export class CategoriasPage implements OnInit {
  categoriasGlobales: Categoria[] = [];
  categoriasPersonales: Categoria[] = [];

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    // Implementar carga paralela o secuencial
    this.categoriasService.getCategoriasGlobales().subscribe(data => this.categoriasGlobales = data);
    this.categoriasService.getCategoriasUsuario().subscribe(data => this.categoriasPersonales = data);
  }
}
