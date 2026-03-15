import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria.model';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: false,
})
export class CategoriasPage implements OnInit {
  categoriasGlobales: Categoria[] = [];
  categoriasPersonales: Categoria[] = [];
  loading = false;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.loading = true;
    forkJoin({
      globales: this.categoriasService.getCategoriasGlobales().pipe(catchError(() => of([]))),
      usuario: this.categoriasService.getCategoriasUsuario().pipe(catchError(() => of([])))
    }).subscribe({
      next: (res) => {
        this.categoriasGlobales = res.globales;
        this.categoriasPersonales = res.usuario;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
