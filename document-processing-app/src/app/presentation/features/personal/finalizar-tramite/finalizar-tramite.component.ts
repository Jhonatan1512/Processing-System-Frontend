import { Component, inject, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastServiceService } from '../../../../data/repositories/toast-service.service';
import { MovimientoServiceService } from '../../../../data/repositories/movimiento-service.service';
import { FinalizarMovimientoModel } from '../../../../data/models/movimiento-model';

@Component({
  selector: 'app-finalizar-tramite',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './finalizar-tramite.component.html',
  styleUrl: './finalizar-tramite.component.css'
})
export class FinalizarTramiteComponent implements OnInit{
 private toastService = inject(ToastServiceService);
 private movimientoService = inject(MovimientoServiceService);
 private fb = inject(FormBuilder);

 @Input() expedienteFinalizar: any;

 @Output() closeModal = new EventEmitter<any>();
 @Output() finalizarMovimiento = new EventEmitter<any>();

 idExpediente: string = '';

 formRegister: FormGroup = this.fb.group({
  comentarioFinal: ['', [Validators.required]],
  estado: ['', [Validators.required]]
 });

  ngOnInit(): void {
    this.obtenerIdExpediente();
  }

  obtenerIdExpediente(){
    if(this.expedienteFinalizar){
      this.idExpediente = this.expedienteFinalizar.id;
    }
  }

  cerrarModal(){
    this.closeModal.emit();
  }

  finalizarMovimientoExpediente(){
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched();
      this.toastService.warning("Todos los campos son obligatorios");
      this.cerrarModal();
      return;
    }

    const formValues = this.formRegister.value;
    const finalMov: FinalizarMovimientoModel = {
      expedienteId: this.idExpediente,
      comentarioFinal: formValues.comentarioFinal,
      estado: Number(formValues.estado),
    } 
    
    this.movimientoService.finalizarMovimiento(finalMov).subscribe({
      next: () => {
        this.toastService.success("Finalizo tramite del expediente");
        this.finalizarMovimiento.emit();
        this.cerrarModal();
      },
      error: () => {
        this.toastService.error("Error: No se pudo finalizar el tramite");
        this.cerrarModal();
      }
    });
  }
}
