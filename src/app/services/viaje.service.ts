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

    getViajes():Observable<any>{
      return this.http.get(this.apiURL+'/Trips').pipe(
        retry(3)
      );
    }

}


