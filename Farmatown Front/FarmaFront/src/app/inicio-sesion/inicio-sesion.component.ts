import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit, OnDestroy {

  //@Output() usuarioLogeado = new EventEmitter<Usuario>();
  formulario: FormGroup;
  enviado:boolean=false;
  rol: number = 1;
  
  private suscripcion = new Subscription();

  constructor(private usuarioService : UsuarioService, private formBuilder: FormBuilder, private router:Router) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      rol: [0, Validators.required]
    });
  }

  enviar() {
    this.enviado=true;
    if (this.formulario.valid ) {      
      /* this.suscripcion.add(
        this.usuarioService.obtenerUsuario(new Usuario(this.formulario.value.usuario, this.formulario.value.password, this.formulario.value.rol))
        .subscribe({
          next: (usuario: Usuario) =>{
           // console.log("TOKEN: ",usuario.token);
            
            this.usuarioService.darUsuarioID(usuario.idUsuario);           
            this.usuarioService.loguear(usuario);
            this.usuarioService.cambiarEstado(2);
            this.router.navigate(['/main']);
          },
          error:()=>{            
            this.formulario.setErrors({'invalid':true});
            alert("Verificar cadena de conexión Program.cs => API y cambiar puerto de swagger. // Verificar API encendida.");            
          }
        })
      ) */
      alert("todo correcto")
    } else {
      alert('formulario invalido')
    }
  }
}
