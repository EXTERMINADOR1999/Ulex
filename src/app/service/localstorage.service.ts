import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() {
    
   }

  cacheSet(parametro: string, valor: string){
    localStorage.setItem(parametro, valor)
  }
  cacheGet(parametro){
    return localStorage.getItem(parametro)
  }
}
