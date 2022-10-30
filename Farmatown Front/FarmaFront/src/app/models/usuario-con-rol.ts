export class UsuarioConRol {
  idUsuario: number;
  usuario: string;
  pwd: string;
  rol: string;

  constructor(usuario: string, pass: string, rol: string) {
    this.usuario = usuario;
    this.pwd = pass;
    this.rol = rol;
  }
}
