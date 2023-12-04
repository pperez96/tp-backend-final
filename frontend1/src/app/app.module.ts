import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import{HttpClientModule} from '@angular/common/http'
import { environment } from './../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearReservaComponent } from './reserva/components/crear-reserva/crear-reserva.component';
import { CrearClienteComponent } from './reserva/components/crear-cliente/crear-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaReservasComponent } from './reserva/components/listar-reservas/lista-reservas.component';
import { FiltroListaReservasComponent } from './reserva/components/filtro-listar-componentes/filtro-lista-reservas.component';
import { DatePipe } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    CrearReservaComponent,
    CrearClienteComponent,
    ListaReservasComponent,
    FiltroListaReservasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule
  ],
  providers: [{ provide: "BASE_API_URL", useValue: environment.apiUrl }, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [CrearClienteComponent]
})
export class AppModule { }
