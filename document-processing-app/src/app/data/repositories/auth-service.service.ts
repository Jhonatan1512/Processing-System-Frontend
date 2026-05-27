import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7088/api/Auth/login";

  iniciarSesion(credenciales: any): Observable<string>{
    return this.http.post(`${this.apiUrl}`, credenciales, {
      responseType: 'text'
    });
  }

  obtenerPaylod(token: string): any{
    try{
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c){
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error){
      console.log('Error decodificando token', error);
      return {};
    }
  }
}
