import { Component, inject, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArchivoServiceService } from '../../../../../data/repositories/archivo-service.service';
import { ArchivoModel } from '../../../../../data/models/archivo-model';
import { ToastServiceService } from '../../../../../data/repositories/toast-service.service';


@Component({
  selector: 'app-register-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private archivoService = inject(ArchivoServiceService);
  private toastService = inject(ToastServiceService);

  @Output() closeModal = new EventEmitter<any>();
  @Output() onCreateExpediente = new EventEmitter<any>();

  @Input() expedienteSeleccinado: any = null; 
  @Input() archivoSeleccionado: any = null; 

  formRegister: FormGroup = this.fb.group({
    id: [null],
    expedienteId: [''],
    archivo: [null, [Validators.required]]
  })

  ngOnInit(): void {
    this.obetenerExpedienteSelecciondo();
    this.obtenerArchivoSeleccionado();
  }

  obetenerExpedienteSelecciondo(){
    if(this.expedienteSeleccinado){
      this.formRegister.patchValue({
        expedienteId: this.expedienteSeleccinado.id
      });
      this.formRegister.get('expedienteId')?.setValidators([Validators.required]);
    }
  }

  obtenerArchivoSeleccionado(){
    if(this.archivoSeleccionado){
      this.formRegister.patchValue({
        id: this.archivoSeleccionado.id,
        archivo: null
      })
    } 
  }

  onFileSelect(event: any) {
    const file: File = event.target.files[0];
    if(file){
      this.formRegister.patchValue({
        archivo: file
      });
      this.formRegister.get('archivo')?.updateValueAndValidity();
    }
  }

  subirArchivo(){
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched();
      return;
    }

    const {id, expedienteId, archivo } = this.formRegister.value;
    const newArchive: ArchivoModel = {id, expedienteId, archivo};     
    
    if(this.archivoSeleccionado){
      this.archivoService.modificarArchivo(id, newArchive).subscribe({
        next: () => {
          this.toastService.success("Archivo modificado correctamente");
          this.onCreateExpediente.emit();
          this.cerrarModalArchivo();
        },
        error: (err) => {
          this.toastService.error("Error al modificar archivo");
          this.cerrarModalArchivo();
          console.log(err);
        }
      })
    } else {
      this.archivoService.subirArchivo(newArchive).subscribe({
        next: () => {
          this.toastService.success("Archivos subidos correctamente");
          this.onCreateExpediente.emit();
          this.cerrarModalArchivo();
        },
        error: (err) => {
          this.toastService.error("Error al subir archivo");
          console.log(err.message);
        }
      });
    }
  }

  cerrarModalArchivo(){
    this.closeModal.emit();
    this.formRegister.reset();
  }

}
