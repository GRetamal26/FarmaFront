import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detallelote } from '../models/detallelote';
import { Lote } from '../models/lote';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  private URLAPI: string = 'https://localhost:7187/api/Lotes/';
  private idLote:number=0;

  constructor(private http: HttpClient) {}

  agregar(lote: Lote): Observable<any> {
    return this.http.post<any>(this.URLAPI + 'InsertarLote', lote);
  }
  agregarDetalle(detalle:Detallelote):Observable<Detallelote>{
    return this.http.post<Detallelote>(this.URLAPI + 'InsertarDetalleLote' + detalle.idLote, detalle);
  }
}
