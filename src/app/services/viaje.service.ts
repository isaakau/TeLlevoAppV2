import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'}) }

      
    apiURL = 'http://192.168.56.1:3000';
  constructor(private http:HttpClient) { }

    //Obtener todos los viajes
    getViajes():Observable<any>{
      return this.http.get(this.apiURL+"/trips").pipe(
        retry(3)
      );
    }

    //Obtener un viaje
    getViaje(id):Observable<any>{
      return this.http.get(this.apiURL+"/trips"+id).pipe(
        retry(3));
    }

    //Crear viaje
    createViaje(id):Observable<any>{ 
      return this.http.post(this.apiURL+"/trips",id,this.httpOptions).pipe( 
        retry(3)); 
      }

}


