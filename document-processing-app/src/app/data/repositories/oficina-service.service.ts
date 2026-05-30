import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OficinaRepository } from '../../domain/repositories/oficina.repository';
import { Observable } from 'rxjs';
import { OficinaModel } from '../models/oficina-model';

@Injectable({
  providedIn: 'root'
})
export class OficinaServiceService implements OficinaRepository{
  
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7088/api/Oficinas";

  obtenerOficinas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listado-oficinas`);
  }

  crearNuevaOficina(data: OficinaModel): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}
