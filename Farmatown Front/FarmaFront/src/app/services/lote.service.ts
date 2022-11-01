import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lote } from '../models/lote';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  private URLAPI: string = 'https://localhost:7187/api/Lotes/';

  constructor(private http: HttpClient) {}

  agregar(lote: Lote): Observable<Lote> {
    return this.http.post<Lote>(this.URLAPI + 'InsertarLote', lote);
  }
}
