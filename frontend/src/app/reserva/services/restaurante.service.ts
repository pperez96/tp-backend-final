import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseLista } from 'src/app/model/response.lista';
import { Restaurante } from 'src/app/model/restaurante';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private api = "restaurante/";

  constructor(private httpClient: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  getRestaurente(): Observable<Restaurante[]>{
   return this.httpClient.get<ResponseLista<Restaurante>>(this.baseUrl+this.api).pipe(map(ev => ev.data));
  }

  getRestaurenteId(id): Observable<Restaurante>{
    return this.httpClient.get(this.baseUrl+this.api+id).pipe(map(ev => ev["data"]));
   }

}
