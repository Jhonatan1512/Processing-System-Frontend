import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../../../data/repositories/auth-service.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  
  isModalOpen: boolean = false;
  nombreUsuario: string = '';

  ngOnInit(): void {
    this.obtenerNombreUsuario();
  }

  abrirModal(){
    this.isModalOpen = !this.isModalOpen; 
  }

  obtenerNombreUsuario(){
    const nombre = this.authService.obtenerNombreUsuario() || 'XX';
    this.nombreUsuario = nombre;
  }

  logout(){
    this.authService.cerrarSesion().subscribe({
      next: () => {
        this.router.navigate(['/login'], {replaceUrl: true});
      },
      error: () => {
        console.log("Error al iniciar sesión");
        localStorage.removeItem('token');
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    })
  }

}
