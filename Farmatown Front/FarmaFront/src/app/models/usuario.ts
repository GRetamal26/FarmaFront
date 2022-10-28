export class Usuario {
    idUsuario: number;
    usuario: string;
    pass: string;
    rol: number;
    constructor(usuario: string, pass: string, rol: number) {
        this.usuario = usuario;
        this.pass = pass; 
        this.rol = rol;       
    }
   
}
