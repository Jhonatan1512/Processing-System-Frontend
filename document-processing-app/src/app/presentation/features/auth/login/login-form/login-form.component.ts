import { Component, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../../../data/repositories/auth-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  private authService = inject(AuthServiceService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  @Output() IrARegistro = new EventEmitter<void>();

  mensajeError: string = '';
  isErrorCreate: boolean = false;
  cargando: boolean = false;
  showPassword: boolean = false;

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

          const rol = this.authService.obtenerRolUsuario();

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
          this.cargando = false;
          this.mensajeError = 'Credenciales Incorrectas';
          this.limpiarCampos();
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
  emitirIrARegistro(): void {
    this.IrARegistro.emit();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  limpiarCampos(){
    this.loginForm.patchValue({
      usuario: '',
      password: ''
    });
  }
} 
