import { Injectable, inject } from '@angular/core';
import { MovimientoRepository } from '../../domain/repositories/movimiento.repository';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FinalizarMovimientoModel, MovimientoModel, RegistrarMovimientoModel } from '../models/movimiento-model';

@Injectable({
  providedIn: 'root'
})
export class MovimientoServiceService implements MovimientoRepository {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7088/api/Movimiento";

  recibirExpediente(id: string, data: MovimientoModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-movimiento/${id}`, data);
  }

  regitrarMovimiento(data: RegistrarMovimientoModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/registra-movimiento`, data);
  } 

  finalizarMovimiento(data: FinalizarMovimientoModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/finalizar-movimiento`, data);
  }
}
