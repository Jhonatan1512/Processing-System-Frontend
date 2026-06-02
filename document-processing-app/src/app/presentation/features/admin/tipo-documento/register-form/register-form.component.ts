import { Component, inject, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TipoDocModel } from '../../../../../data/models/tipo-doc-model';
import { TipoDocServiceService } from '../../../../../data/repositories/tipo-doc-service.service';
import { ToastServiceService } from '../../../../../data/repositories/toast-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private tipoDocService = inject(TipoDocServiceService);
  private toastService = inject(ToastServiceService);

  @Input() editRegister: any = null;

  @Output() closeModal = new EventEmitter<any>();
  @Output() createRegister = new EventEmitter<any>();

  mensaje: string = '';
  isError: boolean = false;
 
  registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  });

  ngOnInit(): void { 
    this.obtenerRegistriEditar();
  }

  cerrar(){
    this.mensaje = '';
    this.isError = false;
    this.closeModal.emit();
  }

  obtenerRegistriEditar(){
    if(this.editRegister){
      this.registerForm.patchValue({
        nombre: this.editRegister.nombre,
        descripcion: this.editRegister.descripcion
      });
    }
  }

  crearRegistro(){
    if(this.registerForm.invalid){
      this.isError = true;
      this.registerForm.markAllAsTouched();
      this.mensaje = "Todos los campos son obligatorios"
      return;
    }

    const {nombre, descripcion} = this.registerForm.value;
    const newRegister: TipoDocModel = { nombre, descripcion, }

    if(this.editRegister){
      const registroId = this.editRegister.id;
      this.tipoDocService.editarRegistro(registroId, newRegister).subscribe({
        next: () => {
          this.toastService.success("Datos del registro modificados");
          this.createRegister.emit();
          this.cerrar();
        },
        error: () => {
          this.toastService.error("Error al modifcar datos del registro");
          this.cerrar();
        }
      })
    } else {      
      this.tipoDocService.crearTipoDoc(newRegister).subscribe({
        next: () => {
          this.toastService.success("Registro creado");
          this.createRegister.emit();
          this.cerrar();
        },
        error: () => {
          this.toastService.error("Error al crear registro");
          this.cerrar();
        }
      });
    }
  }
}
