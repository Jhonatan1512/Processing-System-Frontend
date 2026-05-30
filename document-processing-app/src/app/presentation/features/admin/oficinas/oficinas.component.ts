import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OficinaServiceService } from '../../../../data/repositories/oficina-service.service';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: 'app-oficinas',
  standalone: true, 
  imports: [CommonModule, FormsModule, RegisterFormComponent],
  templateUrl: './oficinas.component.html',
  styleUrl: './oficinas.component.css'
})
export class OficinasComponent implements OnInit {
  private oficinaService = inject(OficinaServiceService);

  listaOficinas: any[] = [];
  isModalInformationOpen: boolean = false;
  isModalOpenAgregar: boolean = false;
  
  responsableSeleccionado: any = null;

  ngOnInit(): void {
    this.obtenerOficinas();
  }

  obtenerOficinas(): void {
    this.oficinaService.obtenerOficinas().subscribe({
      next: (data) => {
        this.listaOficinas = data;
      },
      error: (err) => {
        console.error('Error al cargar las oficinas:', err);
      }
    });
  }  

  abrirModalInformacion(responsable: any): void {
    if (!responsable) return;
    
    this.responsableSeleccionado = responsable;
    this.isModalInformationOpen = true;
  }

  cerrarModalInformacion(): void {
    this.isModalInformationOpen = false;
    this.responsableSeleccionado = null;
  }

  abrirModal(){
    this.isModalOpenAgregar = true;
  }

  onOficinaCreada(){
    this.isModalOpenAgregar = false;
    this.obtenerOficinas();
  }
}