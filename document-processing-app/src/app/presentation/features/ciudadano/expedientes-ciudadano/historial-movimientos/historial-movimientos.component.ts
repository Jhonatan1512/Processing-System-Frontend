import { Component, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-historial-movimientos',
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-movimientos.component.html',
  styleUrl: './historial-movimientos.component.css'
})
export class HistorialMovimientosComponent implements OnInit{

  @Input() expedienteSeleccionadoMov: any = null;

  @Output() closeModalMovimientos = new EventEmitter<any>();

  listaMovimientos: any = null;
 
  ngOnInit(): void {
    this.obtenerDatos();
  }

  cerrar(){
    this.closeModalMovimientos.emit();
  }

  obtenerDatos() {
    if (this.expedienteSeleccionadoMov && this.expedienteSeleccionadoMov.historial) {
      this.listaMovimientos = this.expedienteSeleccionadoMov.historial;
    }
  }

  BadgeColor(estado: string): string {
    if (!estado) return 'badge-pendiente';

    switch (estado.trim().toLowerCase()) {
      case 'pendiente':
        return 'badge-pendiente';   
      case 'recibido':
        return 'badge-recibido';     
      case 'derivado':
        return 'badge-derivado';     
      case 'atendido':
        return 'badge-atendido';  
      case 'rechazado':
        return 'badge-rechazado';    
      default:
        return 'badge-pendiente';
    }
  } 

  IconoEstado(estado: string): string {
    if (!estado) return 'schedule';

    switch (estado.trim().toLowerCase()) {
      case 'pendiente':
        return 'schedule';           
      case 'recibido':
        return 'check_circle';      
      case 'derivado':
        return 'reply';             
      case 'atendido':
        return 'task_alt';           
      case 'rechazado':
        return 'cancel';             
      default:
        return 'schedule';
    }
  }
}
