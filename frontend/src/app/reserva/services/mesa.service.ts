import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mesa } from 'src/app/model/mesa';
import { ResponseLista } from 'src/app/model/response.lista';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  private api = "mesa/";

  constructor(private httpClient: HttpClient,@Inject('BASE_API_URL') private baseUrl: string) { }

  getMesa(idRestaurante: number): Observable<Mesa[]>{
   return this.httpClient.get<ResponseLista<Mesa>>(this.baseUrl+this.api+idRestaurante).pipe(map(ev => ev.data));
  }
}
