import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Consumo } from '../model/consumo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  private basePath = "consumo/";

  constructor(private httpClient: HttpClient ) { } 

  agregarConsumo(consumo : Consumo): Observable<Object> {
    return this.httpClient.post(environment.apiUrl + this.basePath, consumo);
  }

  obtenerConsumo(id: number): Observable<Object> {
    return this.httpClient.get(environment.apiUrl + this.basePath + "mesa/" + id);
  }

  actualizarConsumo(consumo: Consumo): Observable<any> {
    return this.httpClient.put(environment.apiUrl + this.basePath + consumo.id, consumo);
  }

  cerrarConsumo(id: number): Observable<any>{
    return this.httpClient.delete(environment.apiUrl + this.basePath + "cerrar/" + id);
  }
}
