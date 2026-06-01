import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../../../../data/repositories/auth-service.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  private authService = inject(AuthServiceService);

  rolActual: string = '';
  nombreUsuario: string = '';
  menuItems: any[] = [];

  ngOnInit(): void {
    this.definirMenuRole();
    this.obtenerNombreUsuario();
  }
 
  definirMenuRole(){
    const token = localStorage.getItem('token');
    if(!token) return;

    this.rolActual= this.authService.obtenerRolUsuario();

    if(this.rolActual === 'Admin'){
      this.menuItems = [
        {titulo: 'Panel Admin', ruta: '/admin', icono: 'admin_panel_settings'},
        {titulo: 'Oficinas', ruta: '/admin/oficinas', icono: 'group'},
        {titulo: 'Personal', ruta: '/admin/personal', icono: 'groups'}
      ];
    } else if(this.rolActual === 'Personal'){
      this.menuItems = [ 
        {titulo: 'Dashboard', ruta: '/personal', icono: 'dashboard'},
        {titulo: 'Expedientes Nuevos', ruta: '/personal/expedientes', icono: 'snippet_folder'}
      ]
    }else { 
      this.menuItems = [
        {titulo: 'Dashboard', ruta: '/ciudadano', icono: 'dashboard'},
        {titulo: 'Expedientes', ruta: '/ciudadano/acciones-expedientes', icono: 'folder_open'},
      ]
    }
  }

  obtenerNombreUsuario(){
    const nombre = this.authService.obtenerNombreUsuario() || 'XX';
    this.nombreUsuario = nombre;
  }
}
