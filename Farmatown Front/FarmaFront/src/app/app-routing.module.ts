import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { AltaLoteComponent } from './lote/alta-lote/alta-lote.component';
import { ListadoLoteComponent } from './lote/listado-lote/listado-lote.component';
import { MainComponent } from './main/main.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  {path: 'login', component: InicioSesionComponent},
  {path: 'main', component: MainComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'alta', component: AltaLoteComponent},
  {path: 'listado', component: ListadoLoteComponent},
  {path: 'reporte', component: ReporteComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
