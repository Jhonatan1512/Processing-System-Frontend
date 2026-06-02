import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpedienteRepository } from '../../domain/repositories/expediente.repository';
import { Observable } from 'rxjs';
import { ExpedienteModel } from '../models/expediente-model';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteServiceService implements ExpedienteRepository {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7088/api/Expediente";

  obtenerExpedientes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos-los-expedientes`);
  }

  crearExpediente(data: ExpedienteModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, data);
  } 

}
