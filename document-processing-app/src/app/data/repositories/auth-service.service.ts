import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { TokenService } from '../../domain/network/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements AuthRepository{
    
  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private apiUrl = "https://localhost:7088/api/Auth";

  iniciarSesion(credenciales: any): Observable<string>{
    return this.http.post(`${this.apiUrl}/login`, credenciales, {responseType: 'text'}).pipe(
      tap(token => this.tokenService.setToken(token))
    );
  }

  cerrarSesion(): Observable<any>{
    return this.http.post(`${this.apiUrl}/logout`, {}, {responseType: 'json'}).pipe(
      tap(() => {
        this.tokenService.removeToken();
      })
    );
  }

  obtenerNombreUsuario(): string{
    const token = this.tokenService.getToken();
    if(!token) return 'Invitado';

    const payload = this.tokenService.decodeToke(token);
    return payload?.nombre || 'Usuario';
  } 

  obtenerIdOfincina(): string {
    const token = this.tokenService.getToken();
    if(!token) return '';

    const payload = this.tokenService.decodeToke(token);
    return payload?.oficinaId || "";
  }

  obtenerNombreOficina(): string {
    const token = this.tokenService.getToken();
    if(!token) return '';

    const payload = this.tokenService.decodeToke(token);
    return payload?.nombreOficina || "";
  }

  obtenerRolUsuario(): string {
    const token = this.tokenService.getToken();
    if(!token) return 'Invitado';

    const payload = this.tokenService.decodeToke(token);
    if(!payload) return 'Invitado';

    const rol = payload.role || payload['role'] || 
                payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return rol || 'Usuario';
  }

 
}
