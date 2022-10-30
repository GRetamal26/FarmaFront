import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FarmaFront';
  isLoggedIn = false;
  usuario: Usuario;
  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.estadoLogueo().subscribe({
      next: (valor: boolean) => {
        this.isLoggedIn=valor;
      },
    });

    this.usuarioService.usuarioLogin().subscribe({
      next: (usuario: Usuario) => {
        this.usuario=usuario;
      },
    });
  }

  logout() {
    this.usuarioService.desloguear();
    this.router.navigate(['/login']);
  }
}
