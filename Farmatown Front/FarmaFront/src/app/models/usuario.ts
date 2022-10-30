export class Usuario {
    idUsuario: number;
    usuario: string;
    pwd: string;
    
    
    constructor(usuario: string, pass: string) {
        this.usuario = usuario;
        this.pwd = pass; 
              
    }
   
}
