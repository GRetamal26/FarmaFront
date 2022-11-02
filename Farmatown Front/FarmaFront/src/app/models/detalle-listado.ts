export class DetalleListado {
  cantidadcomprada?: number;
  precioCompra?: number;
  idArticulo?: number;
  nombreArticulo?: string;

  constructor(cant?: number, precio?: number, id?: number, nombre?: string) {
    this.cantidadcomprada = cant;
    this.precioCompra = precio;
    this.idArticulo = id;
    this.nombreArticulo = nombre;
  }
}
