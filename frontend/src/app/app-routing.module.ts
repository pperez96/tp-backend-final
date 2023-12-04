import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearReservaComponent } from './reserva/components/crear-reserva/crear-reserva.component';
import { FiltroListaReservasComponent } from './reserva/components/filtro-listar-componentes/filtro-lista-reservas.component';
import { ListaReservasComponent } from './reserva/components/listar-reservas/lista-reservas.component';
import { ConsumoComponent } from './consumo/consumo.component';


const routes: Routes = [
  { path: 'crear-reserva', component: CrearReservaComponent },
  { path: 'listar-reserva-filtrado', component: ListaReservasComponent },
  { path: 'listar-reserva', component: FiltroListaReservasComponent },
  { path: 'gestion-consumo', component: ConsumoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
