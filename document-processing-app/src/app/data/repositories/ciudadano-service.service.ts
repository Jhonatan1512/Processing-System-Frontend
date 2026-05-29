import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CiudadanoRepository } from '../../domain/repositories/ciudadano.repository';
import { CiudadanoModel } from '../models/ciudadano-model';

@Injectable({
  providedIn: 'root'
})
export class CiudadanoServiceService implements CiudadanoRepository {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7088/api/Usuarios";
  
  registroCiudadanos(data: CiudadanoModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrarse`, data);
  }
}
