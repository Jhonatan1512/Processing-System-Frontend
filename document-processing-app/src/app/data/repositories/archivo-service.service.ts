import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArchivRepository } from '../../domain/repositories/archivo.repository';
import { Observable } from 'rxjs';
import { ArchivoModel } from '../models/archivo-model';

@Injectable({
  providedIn: 'root'
})
export class ArchivoServiceService implements ArchivRepository{
      
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7088/api/DocumentoArchivo";
 
  subirArchivo(data: ArchivoModel): Observable<any> {
    const formData = new FormData();

    formData.append('expedienteId', data.expedienteId);
    formData.append('archivo', data.archivo);

    return this.http.post(`${this.apiUrl}`, formData);
  } 

  eliminarArchivo(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  } 

  verArchivo(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ver/${id}`, {responseType: 'blob'});
  }

  obtenerUrlVisro(id: string): string {
    return `${this.apiUrl}/ver/${id}`;
  }
}
