import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulo } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {



  private URLAPI: string = 'https://localhost:7187/api/Articulos/obtenerArticulos';

  constructor(private http: HttpClient) {}
  
  obtenerArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.URLAPI);
  }
}
