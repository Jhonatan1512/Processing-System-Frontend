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
  manuItems: any[] = [];

  ngOnInit(): void {
    this.definirMenuRole();
  }
 
  definirMenuRole(){
    const token = localStorage.getItem('token');
    if(!token) return;

    const payload = this.authService.obtenerPaylod(token);
    this.rolActual = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if(this.rolActual === 'Admin'){
      this.manuItems = [
        {titulo: 'Panel Admin', ruta: '/admin', icono: 'admin_panel_settings'},
        {titulo: 'Oficinas', ruta: '/admin/oficinas', icono: 'group'}
      ]
    }
  }
}
