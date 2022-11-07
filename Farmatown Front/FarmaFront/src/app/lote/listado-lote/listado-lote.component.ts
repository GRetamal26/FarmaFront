import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Articulo } from 'src/app/models/articulo';
import { Detallelote } from 'src/app/models/detallelote';
import { LoteId } from 'src/app/models/lote-id';
import { LoteTotal } from 'src/app/models/lote-total';
import { Proveedor } from 'src/app/models/proveedor';
import { ArticuloService } from 'src/app/services/articulo.service';
import { LoteService } from 'src/app/services/lote.service';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-listado-lote',
  templateUrl: './listado-lote.component.html',
  styleUrls: ['./listado-lote.component.css']
})

export class ListadoLoteComponent implements OnInit, OnDestroy {

  lotes: LoteId[] = [];
  proveedores: Proveedor[] = [];
  detalles: Detallelote[] = [];
  articulos: Articulo[] = [];
  idCambio: number;

  mainForm: FormGroup = new FormGroup({
    tablaDetalles: new FormArray(this.detalles.map(this.getFormGroupForLine))
  });  

  private subscription = new Subscription();

  constructor(
    private servicioProveedor: ProveedorService,
    private servicioLote: LoteService,
    private articuloService: ArticuloService
  ) {}
  

  cargarTabla() {
    this.mainForm = this.getForm();
  }

  getForm(): FormGroup {
    return new FormGroup({
      tablaDetalles: new FormArray(this.detalles.map(this.getFormGroupForLine)),
    });
  }

  getFormGroupForLine(detalle: any): FormGroup {
    return new FormGroup({
      cantidad: new FormControl(detalle.cantidadComprada),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }  

  ngOnInit(): void {
    this.subscription.add(this.servicioProveedor.obtenerProveedores().subscribe({
      next: (proveedores: Proveedor[]) => {
        this.proveedores = proveedores;
      },
      error: () => {
        alert('Error al obtener los proveedores');
      },
    }));
    this.cargarLista();
    this.subscription.add(this.articuloService.obtenerArticulos().subscribe({
      next:(articulos: Articulo[]) => {
        this.articulos = articulos;
       
      },
      error: () => {
        alert('Error al obtener los articulos')
      }
    }));     
  }

  getNombreArticulo(idArticulo?: number): string{
    let articulo: Articulo
    articulo =  this.articulos.find((e: Articulo) => { return e.idArticulo == idArticulo })!
    return articulo.nombreArticulo;
  }
  
  verDetalles(idLote: number) {
    this.subscription.add(this.servicioLote.obtenerDetalles(idLote).subscribe({
      next: (detalles: Detallelote[]) => {
        this.detalles = detalles;
        this.cargarTabla();   
      },
      error: () => {
        alert('Error al obtener los detalles');
      },
    }))
    this.idCambio = idLote;
  }

  quitar(idLote: number) {
    const r: boolean = confirm(
      'esta seguro de borrar?'
    )
    if (r) {
      this.subscription.add(this.servicioLote.quitarDetalles(idLote).subscribe({
        next: () => {
          this.subscription.add(this.servicioLote.quitarLote(idLote).subscribe({
            next: () => {
              alert("Lote eliminado")
              this.cargarLista();
            },
            error: () => {
              alert("error al eliminar el lote")
            }
          }))
        },
        error: () => {
          alert('Error al eliminar detalles');
        }
      }))
    }
  }

  nombrarProveedor(idProveedor: number): string {
    let proveedor: Proveedor
    proveedor = this.proveedores.find((e: Proveedor) => { return e.idProveedor == idProveedor })!
    return proveedor.nombreProveedor;
  }

  filtrar(){
    this.subscription.add(this.servicioLote.obtenerLotes().subscribe({
      next: (lotes: LoteId[]) => {
        this.lotes = lotes;
        this.lotes.sort((a: LoteId, b:LoteId) => b.total - a.total)
      },
      error: () => {
        alert('Error al obtener los lotes');
      }
    }))
  }

  cargarLista() {
    this.subscription.add(this.servicioLote.obtenerLotes().subscribe({
      next: (lotes: LoteId[]) => {
        this.lotes = lotes;        
      },
      error: () => {
        alert('Error al obtener los lotes');
      }
    }));
  }

  quitarDetalle(idArticulo?: number) {
    if (idArticulo) {
      if(this.detalles.length > 1){
        this.detalles.splice(this.detalles.findIndex((e: Detallelote) => { return e.idArticulo == idArticulo }), 1)
      }
      else{
        alert("no puedes eliminar todos los detalles")
      }
    }
  }

  cambioCantidad(id: number, indice: number){
    let i = this.detalles.findIndex((e: Detallelote) => { return e.idArticulo == id });        
    let formLines = this.mainForm.get('tablaDetalles') as FormArray;
    this.detalles[i].cantidadComprada = formLines.controls[indice].get('cantidad')?.value;    
  }

  guardar() {    
    
    this.subscription.add(this.servicioLote.quitarDetalles(this.idCambio).subscribe({
      next: () => {
        let total = 0;
        for (const detalle of this.detalles) {  
          total = total + detalle.cantidadComprada! * detalle.precioCompra!;
          console.log(total);        
          this.servicioLote.agregarDetalle(detalle).subscribe({
            next: () => {
                           
            },
            error: () => {
              alert('Error al cargar detalles');
            }
          });
        }
        let loteTotal = new LoteTotal;
        loteTotal.total = total;
        loteTotal.idLote = this.idCambio
        this.servicioLote.modificarTotal(loteTotal).subscribe({
          next: () => {
            this.cargarLista()
          }
        })
      },
      error: () => {
        alert('Error al quitar detalles');
      }
    }))
  }  
}
