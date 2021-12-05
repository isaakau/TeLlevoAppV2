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

      
    apiURL = 'https://raw.githubusercontent.com/isaakau/TeLlevoAppV2/main/trips.json';
  constructor(private http:HttpClient) { }

    //Obtener todos los viajes
    getViajes():Observable<any>{
      return this.http.get(this.apiURL).pipe(
        retry(3)
      );
    }

    //Obtener un viaje
    getViaje(id):Observable<any>{
      return this.http.get(this.apiURL+id).pipe(
        retry(3));
    }

    //Crear viaje
    createViaje(id):Observable<any>{ 
      return this.http.post(this.apiURL,id,this.httpOptions).pipe( 
        retry(3)); 
      }

}


