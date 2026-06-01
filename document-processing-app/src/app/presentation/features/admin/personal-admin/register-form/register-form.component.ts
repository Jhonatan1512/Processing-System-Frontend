import { Component, inject, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { PersonalSeriveService } from '../../../../../data/repositories/personal-serive.service';
import { PersonalModel } from '../../../../../data/models/personal-model';
import { OficinaServiceService } from '../../../../../data/repositories/oficina-service.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private personalService = inject(PersonalSeriveService);
  private oficinaService = inject(OficinaServiceService);

  @Input() usuarioEditar = new EventEmitter<void>();

  @Output() closeModal = new EventEmitter<void>();
  @Output() agregarUsuario = new EventEmitter<void>(); 

  listaOficinas: any[] = [];
  oficinaId: string = '';
  mensajeError: string = '';
  isErrorCreate: boolean = false;

  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    oficinaId: [null, [Validators.required]]
  });

  ngOnInit(): void {
    this.obtenerOficinas();
  }

  cerraModal(){
    this.closeModal.emit();
  }

  get campoInvalido(){
    return (campo: string) => {
      const control = this.registerForm.get(campo);
      return !!(control && control.invalid && (control.touched || control.dirty));
    }
  }

  obtenerOficinas(){
    this.oficinaService.obtenerOficinas().subscribe({
      next: (data) => {
        this.listaOficinas = data;
      },
      error: (err) => {
        console.log(err);
      }
     });
  }

  UserCreate(){
    this.mensajeError = '';
    this.isErrorCreate = false;

    if (this.registerForm.invalid) {
      this.isErrorCreate = true;
      this.registerForm.markAllAsTouched();
      this.mensajeError = "Todos los campos son obligatorios";
      return;
    }
    const {nombre, apellidos, dni, oficinaId} = this.registerForm.value;
    const newUser: PersonalModel = { nombre, apellidos, dni, oficinaId, };

    this.personalService.crearPersonal(newUser).subscribe({
      next: () => {
        this.isErrorCreate = false;
        this.mensajeError = "Usuario creado";
        this.registerForm.reset();
        this.agregarUsuario.emit();
      },
      error: (err) => { 
        this.isErrorCreate = true; 
        console.log(err);
        if(err.error && typeof err.error === 'object'){
            this.mensajeError = err.error.message || 'El Dni ya se encuntran registrados';
          } else if(err.error && typeof err.error === 'string'){
            this.mensajeError = err.error; 
          }
        }      
    });
  }
}
