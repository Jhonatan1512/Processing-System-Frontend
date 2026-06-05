import { Component, inject, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ValidationErrors, AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CiudadanoModel } from '../../../../../data/models/ciudadano-model';
import { CiudadanoServiceService } from '../../../../../data/repositories/ciudadano-service.service';

@Component({
  selector: 'app-register-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  private fb = inject(FormBuilder);
  private ciudadanoService = inject(CiudadanoServiceService);

  @Output() IrALogin = new EventEmitter<void>();

  mensajeError: string = '';
  isErrorCreate: boolean = false;

  showPasswordActual: boolean = false;
  showPasswordConfim: boolean = false;

  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', 
      [Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)
      ]],
    confirmarPassword: ['', [Validators.required]]
  },{
    validators: this.validarContrasenasIguales
  });

  private validarContrasenasIguales(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmarPassword = control.get('confirmarPassword')?.value;

    if(!password || !confirmarPassword) return null;
    return password === confirmarPassword ? null : { noCoincide: true };
  }

  get campoInvalido(){
    return (campo: string) => this.registerForm.get(campo)?.valid && this.registerForm.get(campo)?.touched;
  } 

  registrarUsuario(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      this.isErrorCreate = true;
      this.mensajeError = 'Todos los campos son obligatorios';
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
        this.isErrorCreate = false;
        this.mensajeError = 'Usuario creado correcatmente';
        this.limpiarDatosRegistro();
      }, 
      error: (err) => {
        if(err.error){
          if(err.error && typeof err.error === 'object'){
            this.mensajeError = err.error.message || 'El Dni o email ya se encuntran registrados';
          } else if(err.error && typeof err.error === 'string'){
            this.mensajeError = err.error;
          }
        }
        this.limpiarDatosRegistro();
        this.isErrorCreate = true;
      } 
    })
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

  togglePasswordActual() {
    this.showPasswordActual = !this.showPasswordActual;
  }

   togglePasswordConfim() {
    this.showPasswordConfim = !this.showPasswordConfim;
  }

  emitirIrALogin(): void {
    this.IrALogin.emit();
  }
}
