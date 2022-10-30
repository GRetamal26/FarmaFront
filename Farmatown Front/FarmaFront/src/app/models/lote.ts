import { Proveedor } from './proveedor';

export class Lote {
  fechaLote: string;
  total: number;  
  idProveedor: number;
  proveedor?: Proveedor;
}
