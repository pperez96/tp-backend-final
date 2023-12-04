import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseLista } from '../model/response.lista';
import { Producto } from '../model/producto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService { 

  private basePath = "producto/";

  constructor(private httpClient: HttpClient) { } 

  getProductos(){
    return this.httpClient.get<ResponseLista<Producto>>(environment.apiUrl+this.basePath).pipe(map(d => d.data));
  }

  getProductosPorIdCategoria(id_categoria : number){
    return this.httpClient.get<ResponseLista<Producto>>(environment.apiUrl + this.basePath + id_categoria).pipe(map(d => d.data));
  } 

}
