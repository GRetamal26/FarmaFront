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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
