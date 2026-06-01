import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalSeriveService } from '../../../../data/repositories/personal-serive.service';
import { RegisterFormComponent } from './register-form/register-form.component';

@Component({
  selector: 'app-personal-admin',
  imports: [CommonModule, FormsModule, RegisterFormComponent],
  templateUrl: './personal-admin.component.html',
  styleUrl: './personal-admin.component.css'
})
export class PersonalAdminComponent implements OnInit {
  private personalService = inject(PersonalSeriveService);

  listaUsuarios: any[] = [];
  isModalOpen: boolean = false;
  usuarioSeleccionado: any = null;

  ngOnInit(): void {
    this.obtenerPersonal();
  }

  obtenerPersonal(){
    this.personalService.obtenerPersonal().subscribe({
      next: (data) => {
        this.listaUsuarios = data;
      }
    });
  }

  onUserCreate(){
    this.isModalOpen = false;
    this.obtenerPersonal();
  }

  onEditUser(){
    this.obtenerPersonal();
  }

  abrirModalCrear(){
    this.usuarioSeleccionado = null;
    this.isModalOpen = true;
  }

  abrirModalEditar(usuario?:any){
    this.usuarioSeleccionado = usuario;
    this.isModalOpen = true;
  }
}
