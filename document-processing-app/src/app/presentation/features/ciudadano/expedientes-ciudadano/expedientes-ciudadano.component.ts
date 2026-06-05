import { Component, inject, OnInit } from '@angular/core';
import { ExpedienteServiceService } from '../../../../data/repositories/expediente-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterFormComponent } from './register-form/register-form.component';
import { HistorialMovimientosComponent } from './historial-movimientos/historial-movimientos.component';
import { RegisterFormExpedienteComponent } from './register-form-expediente/register-form-expediente.component';
import { VisorArchivoComponent } from './visor-archivo/visor-archivo.component';
import { ToastServiceService } from '../../../../data/repositories/toast-service.service';
import { ArchivoServiceService } from '../../../../data/repositories/archivo-service.service';

@Component({
  selector: 'app-expedientes-ciudadano',
  standalone: true,  
  imports: [CommonModule, FormsModule, RegisterFormComponent, HistorialMovimientosComponent, 
    RegisterFormExpedienteComponent, VisorArchivoComponent], 
  templateUrl: './expedientes-ciudadano.component.html',
  styleUrl: './expedientes-ciudadano.component.css' 
})
export class ExpedientesCiudadanoComponent implements OnInit { 
  private expedienteService = inject(ExpedienteServiceService);
  private toastService = inject(ToastServiceService);
  private archivoService = inject(ArchivoServiceService);

  isModalArchivoOpen: boolean = false;
  isModalMovimientosOpen: boolean = false;
  isModalExpedienteOpen: boolean = false;
  isVisorOpen: boolean = false;
  listaExpedientes: any[] = [];
  isExpedienteSeleccionado: any = null;
  isArchivo: any = null;
  isArchivoSeleccionado: any = null;

  ngOnInit(): void {
    this.obetenerExpediente();
  }
 
  obetenerExpediente(){
    this.expedienteService.obtenerExpedientes().subscribe({
      next: (data) => {
        this.listaExpedientes = data;
      }, error: (err) => {
        console.log(err)
      }
    });
  }

  abrirModalArchivo(expediente?: any) {
    this.isArchivoSeleccionado = null;
    this.isExpedienteSeleccionado = expediente;
    this.isModalArchivoOpen = true;
  }

  abrirModalMovimientos(expediente? :any){
    this.isModalMovimientosOpen = true;
    this.isExpedienteSeleccionado = expediente;
  }

  abrirModalExpediente(){
    this.isModalExpedienteOpen = true;
    this.obetenerExpediente();
  }

  abrirModalEditarArchivo(expediente: any, archivo: any) {
  this.isExpedienteSeleccionado = expediente; 
  this.isArchivoSeleccionado = archivo;      
  this.isModalArchivoOpen = true;             
}

  abrirVisor(archivo?: any){
    this.isArchivo = archivo;
    this.isVisorOpen = true; 
  }
 
  crearArchivo(){
    this.isArchivoSeleccionado = null;
    this.isExpedienteSeleccionado = null;
    this.obetenerExpediente();
  }

  crearExpediente(){
    this.isExpedienteSeleccionado = null;
    this.obetenerExpediente();
  }

  eliminarArchivo(id: string){
    this.toastService.confirm("Advertencia","¿Estas seguro de eliminar este archivo?")
      .then((result) => {
        if(result.isConfirmed){
          this.archivoService.eliminarArchivo(id).subscribe({
            next: () => {
              this.toastService.success("Archivo eliminado correctamente");
              this.obetenerExpediente();
            },
            error: () => {
              this.toastService.error("Error al eliminar archivo");
            }
          });
        }
      });
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

  IconoEstado(estado: string): string {
    if (!estado) return 'warning_amber';

    switch (estado.trim().toLowerCase()) {
      case 'registrado':
        return 'history_edu';        
      case 'enproceso':
        return 'cached';             
      case 'finalizado':
        return 'task_alt';          
      default:
        return 'warning_amber';      
    }
  }
}
