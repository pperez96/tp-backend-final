import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cliente} from 'src/app/model/cliente';
import { ResponseLista } from 'src/app/model/response.lista';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private api = "cliente/";

  constructor(private httpClient: HttpClient,@Inject('BASE_API_URL') private baseUrl: string) { }

  existe(id: number){
   return this.httpClient.get(this.baseUrl+this.api+id);
  }

  crear(cliente: Cliente):Observable<any>{
    return this.httpClient.post(this.baseUrl+this.api,cliente);
  }
  getClientes():Observable<any>{
    return this.httpClient.get<ResponseLista<Cliente>>(this.baseUrl+this.api).pipe(map(ev=>ev.data));
  }
  getCliente(cedulaCliente: number):Observable<Cliente>{
    return this.httpClient.get(this.baseUrl+this.api+cedulaCliente).pipe(map(ev=>ev["data"]))
  }
}
