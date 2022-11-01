import { Component, OnDestroy, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor';
import { Lote } from 'src/app/models/lote';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/models/articulo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-alta-lote',
  templateUrl: './alta-lote.component.html',
  styleUrls: ['./alta-lote.component.css'],
})

export class AltaLoteComponent implements OnInit, OnDestroy {
  fechaHoy: Date = new Date();
  proveedores:Proveedor[];
  proveedor:Proveedor;
  articulos:Articulo[];
  articulo:Articulo;

  formulario: FormGroup;

  private subscription = new Subscription();
  
  

  constructor( private servicioProveedor: ProveedorService, private servicioArticulo:ArticuloService, private formBuilder:FormBuilder) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.servicioProveedor.obtenerProveedores().subscribe({
        next:(proveedores:Proveedor[])=>{
          this.proveedores=proveedores;
        },
        error:()=>{
          alert('Error al obtener los proveedores');
        },
      })
    );

    this.subscription.add(
      this.servicioArticulo.obtenerArticulos().subscribe({
        next:(articulos:Articulo[])=>{
          this.articulos=articulos;
        },
        error:()=>{
          alert('Error al obtener los artículos');
        },
      })
    );

    this.formulario = this.formBuilder.group({
      proveedor: ['', Validators.required],
      articulo: ['', Validators.required]
    });
    
  }

  enviarLote(){
    
  }
    
  }
  


