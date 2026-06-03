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

  formRegister: FormGroup = this.fb.group({
    expedienteId: ['', [Validators.required]],
    archivo: [null, [Validators.required]]
  })

  ngOnInit(): void {
    this.obetenerExpedienteSelecciondo();
  }

  obetenerExpedienteSelecciondo(){
    if(this.expedienteSeleccinado){
      this.formRegister.patchValue({
        expedienteId: this.expedienteSeleccinado.id
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

    const { expedienteId, archivo } = this.formRegister.value;
    const newArchive: ArchivoModel = {expedienteId, archivo};
    
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

  cerrarModalArchivo(){
    this.closeModal.emit();
  }

}
