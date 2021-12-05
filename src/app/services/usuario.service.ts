import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  apiURL = 'https://raw.githubusercontent.com/isaakau/TeLlevoAppV2/main/users.json'
  constructor(private http:HttpClient) { }

  //Obtener un usuario
  getUsuario(id):Observable<any>{
    return this.http.get(this.apiURL+id).pipe(
      retry(3));
  }

  //Obtener todos los viajes
  getUsuarios():Observable<any>{
    return this.http.get(this.apiURL).pipe(
      retry(3)
    );
  }
}
