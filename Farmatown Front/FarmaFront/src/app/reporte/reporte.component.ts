import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
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
  cosmeticos: Vendidosxmes[] = [];
  vendidosxmes: Vendidosxmes[] = [];
  filtrado: boolean = false;
  datos: ChartData<'bar'>;
  datosvacios: ChartData<'bar'>;
  filtros: FormGroup;
  barChartType: ChartType = 'bar';
  barChartPlugins = [];
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  lblCosmeticos: string[] = [];
  anios = Array.from({ length: 5 }, (item, i) => {
    let anio: Date = new Date();
    return anio.getFullYear() - i
  })
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  private subscription = new Subscription();
  reporte: number = 1;

  constructor(private servicioReportes: ReporteService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filtros = this.formBuilder.group({
      mes: [0, Validators.required],
      anio: [this.anios[0], Validators.required]
    });
    this.subscription.add(this.servicioReportes.reporteVendidosxmes().subscribe({
      next: (vendidos: Vendidosxmes[]) => {
        this.vendidosxmes = vendidos;
        this.vendidosxmes.sort((a: Vendidosxmes, b: Vendidosxmes) => b.cantidad - a.cantidad)

      },
      error: () => { alert("error al obtener un reporte") }
    }))
    this.subscription.add(this.servicioReportes.reporteArticulosAvencer().subscribe({
      next: (articulos: Articulosavencer[]) => {
        this.articulosavencer = articulos;
        this.articulosavencer.sort();
      },
      error: () => { alert("error al obtener un reporte") }
    }))
    this.subscription.add(this.servicioReportes.reporteArticulosxaño().subscribe({
      next: (articulos: Articulosxaño[]) => {
        this.articulosxanio = articulos;
        this.articulosxanio.sort((a: Articulosxaño, b: Articulosxaño) => b.cantidad - a.cantidad)

      },
      error: () => { alert("error al obtener un reporte") }
    }))
  }

  cambioReporte(reporte: number) {
    this.reporte = reporte
  }
  filtrar() {
    this.filtrado = true
    this.cosmeticos = []
    this.datos = this.datosvacios
    console.log(this.filtros.get('anio')?.value)
    this.vendidosxmes.forEach((x: Vendidosxmes) => {
      if ((x.anio == this.filtros.get('anio')?.value) && (x.mes == (this.filtros.get('mes')?.value + 1))) {
        this.cosmeticos.push(x);
        console.log(x)
      }
    })
    let datosTransformados = this.cosmeticos.map((valor) => {
      return {
        data: [valor.cantidad],
        label: valor.nombre,
        barThickness: 45,
        borderRadius: 4,
        maxBarThickness: 40
      }
    });
    if (this.cosmeticos.length > 0) {
      this.cosmeticos.forEach(x => this.lblCosmeticos.push(x.nombre));
      this.datos = {
        labels: ["Cosmeticos vendidos"],
        datasets: datosTransformados
      }
    }
  }

}


