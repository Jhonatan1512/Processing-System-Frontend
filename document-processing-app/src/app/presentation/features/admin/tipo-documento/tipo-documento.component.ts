import { Component, inject, OnInit } from '@angular/core';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoDocServiceService } from '../../../../data/repositories/tipo-doc-service.service';

@Component({
  selector: 'app-tipo-documento',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterFormComponent],
  templateUrl: './tipo-documento.component.html',
  styleUrl: './tipo-documento.component.css'
})
export class TipoDocumentoComponent implements OnInit {
  private tipoDocService = inject(TipoDocServiceService);

  listaRegistros: any[] = [];
  isModalOpen: boolean = false;
  registroSeleccionado: any = null;

  ngOnInit(): void {
    this.obtenerRegistros();  
  }

  obtenerRegistros(){
    this.tipoDocService.obtenerTipoDoc().subscribe({
      next: (data) => {
        this.listaRegistros = data;
      }
    });
  }

  abrirModalAgregar(){
    this.registroSeleccionado = null;
    this.isModalOpen = true;
  }

  abrirModalEditar(registro?:any){
    this.registroSeleccionado = registro;
    this.isModalOpen = true;
  }

  onCreateRegister(){
    this.isModalOpen = false;
    this.obtenerRegistros();
  }

}
