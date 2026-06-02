import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoDocRepository } from '../../domain/repositories/tipo-doc.repository';
import { Observable } from 'rxjs';
import { TipoDocModel } from '../models/tipo-doc-model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocServiceService implements TipoDocRepository{
    
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7088/api/TipoDocumento"

  obtenerTipoDoc(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lista-tipo-documentos`);
  }

  crearTipoDoc(data: TipoDocModel): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  editarRegistro(id: string, data: TipoDocModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/actualizar-tipo-documento/${id}`, data);
  }
}
