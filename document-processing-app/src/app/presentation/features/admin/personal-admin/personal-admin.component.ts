import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonalSeriveService } from '../../../../data/repositories/personal-serive.service';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ToastServiceService } from '../../../../data/repositories/toast-service.service';

@Component({
  selector: 'app-personal-admin',
  imports: [CommonModule, FormsModule, RegisterFormComponent],
  templateUrl: './personal-admin.component.html',
  styleUrl: './personal-admin.component.css'
})
export class PersonalAdminComponent implements OnInit {
  private personalService = inject(PersonalSeriveService);
  private toastService = inject(ToastServiceService);

  listaUsuarios: any[] = [];
  isModalOpen: boolean = false;
  usuarioSeleccionado: any = null;

  ngOnInit(): void {
    this.obtenerPersonal();
  }

  obtenerPersonal(){
    this.personalService.obtenerPersonal().subscribe({
      next: (data) => {
        this.listaUsuarios = data.map((usuario: any) => ({
          ...usuario,
          estaEliminado: usuario.estaEliminado === 'True' 
        }));
      }
    });
  }

  eliminarUsuario(usuario: any){
    const nuevoEstado = !usuario.estaEliminado;
    const userId = usuario.id;

    const dto = {
      estaEliminado: nuevoEstado
    }

    this.toastService.confirm(
      "Confirmar",
      `¿Estas seguro que desas ${nuevoEstado ? 'descativar' : 'activar'} al usuario?`
    )
    .then((result) => {
      if(result.isConfirmed){
        this.personalService.eliminarPersonal(userId, dto).subscribe({
          next: () => {
            this.toastService.success(`Usuario ${nuevoEstado ? 'Desactivado' : 'Activado'}`);
            usuario.estaEliminado = nuevoEstado;
          },
          error: () => {
            this.toastService.error("Error al realizar acción");
          }
        });
      }
    })
  }

  onUserCreate(){
    this.isModalOpen = false;
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
