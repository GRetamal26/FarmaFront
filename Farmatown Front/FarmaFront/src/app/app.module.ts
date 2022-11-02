import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { MainComponent } from './main/main.component';
import { AltaLoteComponent } from './lote/alta-lote/alta-lote.component';
import { BajaLoteComponent } from './lote/baja-lote/baja-lote.component';
import { ListadoLoteComponent } from './lote/listado-lote/listado-lote.component';
import { ArticuloService } from './services/articulo.service';
import { LoteService } from './services/lote.service';
import { ProveedorService } from './services/proveedor.service';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    MainComponent,
    AltaLoteComponent,
    BajaLoteComponent,
    ListadoLoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ArticuloService, LoteService, ProveedorService, UsuarioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
