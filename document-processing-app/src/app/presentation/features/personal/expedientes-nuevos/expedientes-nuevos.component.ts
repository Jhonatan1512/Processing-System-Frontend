import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpedienteServiceService } from '../../../../data/repositories/expediente-service.service';
import { ArchivoServiceService } from '../../../../data/repositories/archivo-service.service';
import { AuthServiceService } from '../../../../data/repositories/auth-service.service';

@Component({
  selector: 'app-expedientes-nuevos',
  imports: [CommonModule, FormsModule],
  templateUrl: './expedientes-nuevos.component.html',
  styleUrl: './expedientes-nuevos.component.css'
})
export class ExpedientesNuevosComponent implements OnInit {
  private expedienteService = inject(ExpedienteServiceService);
  private archivoService = inject(ArchivoServiceService);
  private authService = inject(AuthServiceService);

  listaExpdientes: any[] = [];
  archivoId: string = '';
  isRecibido: boolean = false;
  EstadoRecivido: string = '';
  oficinaId: string = "";

  ngOnInit(): void {
    this.obtenerOficinaId();
    this.obtenerExpedientes();
  }

  // obtenerArchivo(){
  //   this.archivoService.verArchivo(this.archivoId).subscribe({
  //   })
  // } 

  obtenerExpedientes(){
    this.expedienteService.obtenerExpedientesPorPerfil().subscribe({
      next: (data) => {
        this.listaExpdientes = data;
        console.log(data);
      }
    });
  }

  obtenerOficinaId(){
    const id = this.authService.obtenerIdOfincina();
    this.oficinaId = id ? id.toString().toLowerCase() : ''; 
  }

  BadgeColor(estado: string): string {
    if (!estado) return 'badge-observado';

    switch (estado.trim().toLowerCase()) {
      case 'registrado':
        return 'badge-registrado';   
      case 'enproceso':
        return 'badge-enproceso';    
      case 'finalizado':
        return 'badge-finalizado';   
      default:
        return 'badge-observado';    
    }
  } 

  private getUltimoMovimiento(expediente: any): any {
    if (!expediente?.historial || expediente.historial.length === 0) {
      return null;
    }

    const historialOrdenado = [...expediente.historial].sort((a, b) => {
      return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
    });
    return historialOrdenado[0];
  }

  private getEstadoActual(expediente: any): string {
    const ultimoMovimiento = this.getUltimoMovimiento(expediente);
    if (ultimoMovimiento && ultimoMovimiento.estado) {
      return ultimoMovimiento.estado.trim().toLowerCase();
    }
    return '';
  }

  private requiereAtencionEnMiOficina(expediente: any): boolean {
    const ultimoMovimiento = this.getUltimoMovimiento(expediente);
    
    if (!ultimoMovimiento) return false;

    const estado = ultimoMovimiento.estado ? ultimoMovimiento.estado.trim().toLowerCase() : '';
    const esEstadoAtendible = estado === 'pendiente' || estado === 'derivado';
    
    const idDestino = ultimoMovimiento.oficinaDestinoId || ultimoMovimiento.OficinaDestinoId || '';
    
    const esParaMiOficina = idDestino.toString().toLowerCase() === this.oficinaId;

    return esEstadoAtendible && esParaMiOficina; 
  }

  obtenerClaseBotonRecibir(expediente: any): string {
    return this.requiereAtencionEnMiOficina(expediente) ? 'btn-warning' : 'btn-success';
  }

  obtenerIconoBotonRecibir(expediente: any): string {
    return this.requiereAtencionEnMiOficina(expediente) ? 'notification_important' : 'check_circle';
  }

  obtenerTextoBotonRecibir(expediente: any): string {
    return this.requiereAtencionEnMiOficina(expediente) ? 'Recibir' : 'Recibido';
  }

  estaBotonRecibirDeshabilitado(expediente: any): boolean {
    return !this.requiereAtencionEnMiOficina(expediente);
  }

  estaBotonDerivarDeshabilitado(expediente: any): boolean {
    const ultimoMovimiento = this.getUltimoMovimiento(expediente);
    
    if (!ultimoMovimiento) return true; 

    const estado = ultimoMovimiento.estado ? ultimoMovimiento.estado.trim().toLowerCase() : '';
    const idDestino = ultimoMovimiento.oficinaDestinoId || ultimoMovimiento.OficinaDestinoId || '';
    const esParaMiOficina = idDestino.toString().toLowerCase() === this.oficinaId;

    const estaListoParaDerivar = esParaMiOficina && estado === 'recibido';

    return !estaListoParaDerivar;
  }

  marcarComoRecibido(expedienteId: string) {
    this.expedienteService
  }  
 
}