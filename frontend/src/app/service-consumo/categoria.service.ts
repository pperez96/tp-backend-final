import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseLista } from '../model/response.lista';
import { Categoria } from '../model/categoria';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private basePath = "categoria/";

  constructor(private httpClient: HttpClient) { } 

  getCategorias() {
    return this.httpClient.get<ResponseLista<Categoria>>(environment.apiUrl + this.basePath).pipe(map(t => t.data));
  }
}
