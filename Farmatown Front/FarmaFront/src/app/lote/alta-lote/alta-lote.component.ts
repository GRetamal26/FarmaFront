import { Component, OnDestroy, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { Proveedor } from 'src/app/models/proveedor';
import { Lote } from 'src/app/models/lote';
import { ArticuloService } from 'src/app/services/articulo.service';
import { Articulo } from 'src/app/models/articulo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DetalleListado } from 'src/app/models/detalle-listado';
import { LoteService } from 'src/app/services/lote.service';
import { Detallelote } from 'src/app/models/detallelote';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-alta-lote',
  templateUrl: './alta-lote.component.html',
  styleUrls: ['./alta-lote.component.css'],
})
export class AltaLoteComponent implements OnInit, OnDestroy {
  
  proveedores: Proveedor[];
  proveedor: Proveedor;
  articulos: Articulo[];
  articulo: Articulo;
  detallesListado: DetalleListado[] = [];
  lote = {} as Lote;
  detallesLote: Detallelote[] = [];

  formulario: FormGroup;

  private subscription = new Subscription();

  constructor(
    private servicioProveedor: ProveedorService,
    private servicioArticulo: ArticuloService,
    private formBuilder: FormBuilder,
    private servicioLote: LoteService
  ) {}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.servicioProveedor.obtenerProveedores().subscribe({
        next: (proveedores: Proveedor[]) => {
          this.proveedores = proveedores;
        },
        error: () => {
          alert('Error al obtener los proveedores');
        },
      })
    );

    this.subscription.add(
      this.servicioArticulo.obtenerArticulos().subscribe({
        next: (articulos: Articulo[]) => {
          this.articulos = articulos;
        },
        error: () => {
          alert('Error al obtener los artículos');
        },
      })
    );

    this.formulario = this.formBuilder.group({
      proveedor: ['', Validators.required],
      articulo: ['', Validators.required],
      cantidad: ['', Validators.required],
      fechaVencimiento: ['', Validators.required]
    });
  }

  agregar() {    
    if (
      this.formulario.value.articulo !== '' &&
      this.formulario.value.cantidad !== ''
    ) {
      let articulo = this.articulos.find(
        (e) => e.idArticulo == this.formulario.value.articulo
      );
      let detalle = new DetalleListado(
        this.formulario.value.cantidad,
        articulo?.precioUnitario,
        articulo?.idArticulo,
        articulo?.nombreArticulo
      );
      if (
        this.detallesListado.find((e) => e.idArticulo == detalle.idArticulo)
      ) {
        alert('Ese artículo ya está seleccionado!');
        return;
      }
      this.detallesListado.push(detalle);
    }
  }
  quitar(id?: number) {
    const index = this.detallesListado.findIndex((x) => x.idArticulo === id);
    return this.detallesListado.splice(index, 1);
  }
  armarLote() {
    let fecha: string = this.formulario.get('fechaVencimiento')?.value      
    this.lote.fechaLote = fecha;
    let total = 0;
    for (const detalle of this.detallesListado) {
      if (detalle.precioCompra && detalle.cantidadcomprada) {
        total += detalle.precioCompra * detalle.cantidadcomprada;
      }
    }
    this.lote.total = total;
    this.lote.idProveedor = this.formulario.value.proveedor;
    console.log(fecha);
  }

  enviarLote() {
    if (this.formulario.value.proveedor != 0) {
      if (this.detallesListado.length == 0) {
        alert('Debes ingresar artículos!');
        return;
      }
      else if(this.formulario.get('fechaVencimiento')!.value) {        
        this.armarLote();
        this.subscription.add(
          this.servicioLote.agregar(this.lote).subscribe({
            next: (respuesta: number) => {
              for (const detalle of this.detallesListado) {
                let detalleLote = {} as Detallelote;
                detalleLote.cantidadComprada = detalle.cantidadcomprada;
                detalleLote.precioCompra = detalle.precioCompra;
                detalleLote.idArticulo = detalle.idArticulo;
                detalleLote.idLote = respuesta;
                this.detallesLote.push(detalleLote);
              }
              for (const detalle of this.detallesLote) {
                this.servicioLote.agregarDetalle(detalle).subscribe({
                  next: () => {
                    console.log('enviadooo');                    
                    this.detallesListado = [];
                    this.detallesLote = [];
                  },
                  error: () => {
                    alert('Error al enviar detalles')
                    this.detallesListado = [];
                    this.detallesLote = [];
                  }
                });
              }
              alert('Enviado con exito!');
            },
          })
        );
      }
      else{
        alert("Debe seleccionar una fecha!")
      }
    } else {
      alert('Debe seleccionar un proveedor!');
      return;
    }

  }
}
