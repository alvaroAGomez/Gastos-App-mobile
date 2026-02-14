import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../../services/perfil.service';
import { Usuario } from '../../models/perfil.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private authService: AuthService,
    private perfilService: PerfilService
  ) {}

  ngOnInit() {
    this.perfilService.getPerfil().subscribe(u => this.usuario = u);
  }

  logout() {
    this.authService.logout();
  }
}
