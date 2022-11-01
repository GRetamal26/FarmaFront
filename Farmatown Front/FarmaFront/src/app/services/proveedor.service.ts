import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  private URLAPI: string = 'https://localhost:7187/api/Proveedores/ObtenerProveedores';

  constructor(private http: HttpClient) {}
  
  obtenerProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.URLAPI);
  }



}
