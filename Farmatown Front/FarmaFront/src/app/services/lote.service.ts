import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Detallelote } from '../models/detallelote';
import { Lote } from '../models/lote';
import { LoteId } from '../models/lote-id';
import { LoteTotal } from '../models/lote-total';

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

  modificarTotal(lote:LoteTotal):Observable<LoteTotal>{
    return this.http.put<LoteTotal>(this.URLAPI + 'ModificarTotalLote', lote);
  }

  obtenerLotes():Observable<LoteId[]>{
    return this.http.get<LoteId[]>(this.URLAPI + 'obtenerLotes');
  }
  obtenerDetalles(idLote: number):Observable<Detallelote[]>{
    return this.http.get<Detallelote[]>(this.URLAPI + 'obtenerDetalles?idLote=' + idLote)
  }

  quitarDetalles(idLote: number):Observable<any> {
    return this.http.delete<any>(this.URLAPI + 'BorrarDetalles' + idLote);
  }
  quitarLote(idLote: number):Observable<any> {
    return this.http.delete<any>(this.URLAPI + 'BorrarLote' + idLote);
  }
  /* modificarLote(lote:Lote):Observable<Persona>{
    return this.http.put<Persona>(this.url+'/'+p.id,p);
  } */
}
