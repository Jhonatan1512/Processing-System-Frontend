import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalRepository } from '../../domain/repositories/personal.repository';
import { Observable } from 'rxjs';
import { PersonalModel } from '../models/personal-model';

@Injectable({
  providedIn: 'root'
})
export class PersonalSeriveService implements PersonalRepository{
  
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7088/api/Personal";
  
  obtenerPersonal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listado-personal`);
  }

  crearPersonal(data: PersonalModel): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  editarPersonal(id: string, data: PersonalModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-datos/${id}`, data);
  }
  
}
