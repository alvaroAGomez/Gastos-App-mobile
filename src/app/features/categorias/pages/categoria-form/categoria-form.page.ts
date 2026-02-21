import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateCategoriaRequest } from '../../../gastos/models/gasto.model';

interface IconOption { name: string; label: string; }

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.page.html',
  styleUrls: ['./categoria-form.page.scss'],
  standalone: false,
})
export class CategoriaFormPage implements OnInit {
  isEditMode = false;

  nombre: string = '';
  selectedColor: string = '#10b981';
  selectedIcon: string = 'cart';

  colores: string[] = [
    '#10b981', '#6366f1', '#ef4444', '#f59e0b', '#a855f7',
    '#06b6d4', '#3b82f6', '#f97316', '#ec4899', '#14b8a6',
    '#e879f9', '#64748b'
  ];

  iconos: IconOption[] = [
    { name: 'cart',            label: 'Compras' },
    { name: 'restaurant',      label: 'Comida' },
    { name: 'car',             label: 'Auto' },
    { name: 'airplane',        label: 'Viajes' },
    { name: 'game-controller', label: 'Juegos' },
    { name: 'medkit',          label: 'Salud' },
    { name: 'school',          label: 'Educación' },
    { name: 'paw',             label: 'Mascotas' },
    { name: 'wifi',            label: 'Internet' },
    { name: 'calculator',      label: 'Finanzas' },
    { name: 'musical-notes',   label: 'Música' },
    { name: 'barbell',         label: 'Gym' },
    { name: 'home',            label: 'Hogar' },
    { name: 'person',          label: 'Personal' },
    { name: 'tv',              label: 'TV' },
    { name: 'sunny',           label: 'Otro' },
    { name: 'shirt',           label: 'Ropa' },
    { name: 'bag-handle',      label: 'Bolsa' },
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.isEditMode = true;
  }

  buildPayload(): CreateCategoriaRequest {
    return {
      nombre: this.nombre,
      es_global: false,
      color_hex: this.selectedColor,
      icono: this.selectedIcon,
    };
  }

  crear() {
    if (!this.nombre.trim()) return;
    const payload = this.buildPayload();
    console.log('Crear categoría:', payload);
    // TODO: llamar al service
    this.router.navigate(['/app/gastos/nuevo']);
  }

  cancelar() {
    this.router.navigate(['/app/gastos/nuevo']);
  }
}
