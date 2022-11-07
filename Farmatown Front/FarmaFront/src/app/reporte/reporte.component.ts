import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Articulosavencer } from '../models/articulosavencer';
import { Articulosxaño } from '../models/articulosxaño';
import { Vendidosxmes } from '../models/vendidosxmes';
import { ReporteService } from '../services/reporte.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  articulosavencer: Articulosavencer[] = [];
  articulosxanio: Articulosxaño[] = [];
  vendidosxmes: Vendidosxmes[] = [];
  private subscription = new Subscription();
  reporte: number = 1;

  constructor(private servicioReportes: ReporteService) { }

  ngOnInit(): void {
    this.subscription.add(this.servicioReportes.reporteVendidosxmes().subscribe({
      next: (vendidos: Vendidosxmes[]) => {
      this.vendidosxmes = vendidos;
      this.vendidosxmes.sort((a: Vendidosxmes, b:Vendidosxmes) => b.cantidad - a.cantidad)
      },
      error: () => 
      {alert("error al obtener un reporte")}
    }))
    this.subscription.add(this.servicioReportes.reporteArticulosAvencer().subscribe({
      next: (articulos: Articulosavencer[]) => {
      this.articulosavencer = articulos;
      this.articulosavencer.sort();
      },
      error: () => 
      {alert("error al obtener un reporte")}
    }))
    this.subscription.add(this.servicioReportes.reporteArticulosxaño().subscribe({
      next: (articulos: Articulosxaño[]) => {
      this.articulosxanio = articulos;
      this.articulosxanio.sort((a: Articulosxaño, b:Articulosxaño) => b.cantidad - a.cantidad)
      },
      error: () => 
      {alert("error al obtener un reporte")}
    }))
  }

  cambioReporte(reporte: number){
    this.reporte = reporte
  }

}


