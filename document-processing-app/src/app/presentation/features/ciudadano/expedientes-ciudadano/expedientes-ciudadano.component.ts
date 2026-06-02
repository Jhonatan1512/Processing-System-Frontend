import { Component, inject, OnInit } from '@angular/core';
import { ExpedienteServiceService } from '../../../../data/repositories/expediente-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expedientes-ciudadano',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expedientes-ciudadano.component.html',
  styleUrl: './expedientes-ciudadano.component.css'
})
export class ExpedientesCiudadanoComponent implements OnInit { 
  private expedienteService = inject(ExpedienteServiceService);

  isModalArchivoOpen: boolean = false;

  ngOnInit(): void {
    this.obetenerExpediente();
  }

  obetenerExpediente(){
    this.expedienteService.obtenerExpedientes().subscribe({
      next: (data) => {
        console.log(data);
      }
    })
  }

  abrirModalArchivo() {
    this.isModalArchivoOpen = true;
  }

  cerrarModalArchivo() {
    this.isModalArchivoOpen = false;
  }

  subirArchivo() {
    
  }
}
