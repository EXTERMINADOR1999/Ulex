import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url: string = environment.url;

  constructor(private http: HttpClient) { }

  getTodo(){
    return this.http.get<any>(`${environment.url}`);
  }
  getimg(ean: any, extension: any){
    return this.http.get<any>(`${environment.img}/${ean}${extension}`);
  }
}
