import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Articulosavencer } from '../models/articulosavencer';
import { Articulosxaño } from '../models/articulosxaño';
import { Vendidosxmes } from '../models/vendidosxmes';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private URLAPI: string = 'https://localhost:7187/api/Reportes/';

  constructor(private http: HttpClient) {}
  
  reporteVendidosxmes(): Observable<Vendidosxmes[]> {
    return this.http.get<Vendidosxmes[]>(this.URLAPI + 'VistaMasVendidosXmes');
  }

  reporteArticulosxaño(): Observable<Articulosxaño[]> {
    return this.http.get<Articulosxaño[]>(this.URLAPI + 'VistaArticulosXaño');
  }

  reporteArticulosAvencer(): Observable<Articulosavencer[]> {
    return this.http.get<Articulosavencer[]>(this.URLAPI + 'VistaArticulosAVencer');
  }
}
