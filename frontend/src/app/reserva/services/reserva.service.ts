import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reserva } from 'src/app/model/reserva';
import { ResponseLista } from 'src/app/model/response.lista';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private api = "reserva/";

  constructor(private httpClient: HttpClient,@Inject('BASE_API_URL') private baseUrl: string) { }

  crearReserva(reserva: Reserva){
   return this.httpClient.post(this.baseUrl+this.api,reserva);

  }

  getReservas(idRestaurante: number, fecha: string, idCliente?: number): Observable<Reserva[]>{
    if(idCliente){
      return this.httpClient.get<ResponseLista<Reserva>>(this.baseUrl+this.api+`${idRestaurante}/${fecha}/${idCliente}`).pipe(map(ev=>ev.data))
    }else{
      return this.httpClient.get<ResponseLista<Reserva>>(this.baseUrl+this.api+`${idRestaurante}/${fecha}`).pipe(map(ev=>ev.data))
    }
  }
}
