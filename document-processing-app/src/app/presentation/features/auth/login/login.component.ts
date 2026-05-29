import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, ValidationErrors } from '@angular/forms';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../../../data/repositories/auth-service.service';
import { CiudadanoModel } from '../../../../data/models/ciudadano-model';
import { CiudadanoServiceService } from '../../../../data/repositories/ciudadano-service.service';

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
  private ciudadanoService = inject(CiudadanoServiceService);

  esLogin = signal<boolean>(true); 

  mensajeError: string = '';
  isErrorCreate: boolean = false;
  cargando: boolean = false;
  showPassword: boolean = false;
  showPasswordActual: boolean = false;
  showPasswordConfim: boolean = false;
 
  conmutarPantalla(): void {
    this.esLogin.update(estado => !estado);
  }

  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', 
      [Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
      ]],
    confirmarPassword: ['', [Validators.required]]
  },{
    validators: this.validarContrasenasIguales
  })

  private validarContrasenasIguales(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmarPassword = control.get('confirmarPassword')?.value;

    if(!password || !confirmarPassword) return null;
    return password === confirmarPassword ? null : { noCoincide: true };
  }

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

  get campoInvalido(){
    return (campo: string) => this.registerForm.get(campo)?.valid && this.registerForm.get(campo)?.touched;
  }

  registrarUsuario(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    this.mensajeError = '';

    const {nombre, apellidos, dni, email, password} = this.registerForm.value;
    const nuevoCiudadano: CiudadanoModel = {
      nombre,
      apellidos,
      dni,
      email,
      password
    };

    this.ciudadanoService.registroCiudadanos(nuevoCiudadano).subscribe({
      next: () => {
        console.log("Usuario creado");
        this.isErrorCreate = false;
        this.mensajeError = 'Usuario creado correcatmente';
        this.limpiarDatosRegistro();
      }, 
      error: (err) => {
        this.mensajeError = 'Todos los campos son obligatorios';
        console.log(err);
        this.isErrorCreate = true;
      } 
    })

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordActual() {
    this.showPasswordActual = !this.showPasswordActual;
  }

   togglePasswordConfim() {
    this.showPasswordConfim = !this.showPasswordConfim;
  }

  limpiarCampos(){
    this.loginForm.patchValue({
      usuario: '',
      password: ''
    });
  }

  limpiarDatosRegistro(){
    this.registerForm.patchValue({
      nombre: '',
      apellidos: '',
      email: '',
      dni: '',
      password: '',
      confirmarPassword: ''
    })
  }

} 
