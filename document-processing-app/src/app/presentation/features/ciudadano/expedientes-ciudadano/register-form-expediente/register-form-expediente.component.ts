import { Component, EventEmitter, OnInit, inject, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExpedienteModel } from '../../../../../data/models/expediente-model';
import { ExpedienteServiceService } from '../../../../../data/repositories/expediente-service.service';
import { ToastServiceService } from '../../../../../data/repositories/toast-service.service';
import { TipoDocServiceService } from '../../../../../data/repositories/tipo-doc-service.service';

@Component({
  selector: 'app-register-form-expediente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-form-expediente.component.html',
  styleUrl: './register-form-expediente.component.css'
})
export class RegisterFormExpedienteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private expedienteService = inject(ExpedienteServiceService);
  private toastService = inject(ToastServiceService);
  private tipoDocService = inject(TipoDocServiceService);

  @Output() closeModalExpediente = new EventEmitter<any>();
  @Output() onCreateExpediente = new EventEmitter<any>();

  registerForm: FormGroup = this.fb.group({
    asunto: ['', [Validators.required]],
    tipoDocumentoId: ['', [Validators.required]]
  });

  listaTipoDoc: any[] = [];
  
  ngOnInit(): void {
    this.obtenerTipoDocumento();
  }

  cerrarModal(){
    this.closeModalExpediente.emit();
  }

  obtenerTipoDocumento(){
    this.tipoDocService.obtenerTipoDoc().subscribe({
      next: (data) => {
        this.listaTipoDoc = data;
      }
    });
  }

  crearExpediente(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const { asunto, tipoDocumentoId} = this.registerForm.value;
    const newExpediente: ExpedienteModel = {asunto, tipoDocumentoId};

    this.expedienteService.crearExpediente(newExpediente).subscribe({
      next: () => {
        this.toastService.success("Expediente creado correctamente");
        this.onCreateExpediente.emit();
        this.cerrarModal();
      },
      error: () => {
        this.toastService.error("Error al crear expediente");
      }
    });
  }
}
