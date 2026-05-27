import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../../data/repositories/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthServiceService);

  esLogin = signal<boolean>(true);

  mensajeError: string = '';
  cargando: boolean = false;
 
  conmutarPantalla(): void {
    this.esLogin.update(estado => !estado);
  }

  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  login(){
    if(this.loginForm.valid){
      this.cargando = true;
      this.mensajeError = '';

      const credentials = {
        email: this.loginForm.value.usuario,
        password: this.loginForm.value.password
      };

      this.authService.iniciarSesion(credentials).subscribe({
        next: (response: string) => {
          const token = response;
          localStorage.setItem('token', token);

          const payload = this.authService.obtenerPaylod(token);
          const rol = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          console.log('Rol detectado', rol);

          setTimeout(() => {
            if(rol === 'Ciudadano'){
              this.router.navigate (['/ciudadano']);
            } else if(rol === 'Personal'){
              this.router.navigate (['/personal']);
            }else {
              this.router.navigate (['/admin']);
            }
          }, 100);
        },
        error: (err) => {
          console.error('Error en el login', err);
          this.cargando = false;
          this.mensajeError = 'Usuario o contraseña incorrectos';
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

} 
