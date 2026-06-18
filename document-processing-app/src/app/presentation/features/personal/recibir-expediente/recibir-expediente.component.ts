import { Component, Input, Output, inject, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovimientoModel } from '../../../../data/models/movimiento-model';
import { MovimientoServiceService } from '../../../../data/repositories/movimiento-service.service';
import { ToastServiceService } from '../../../../data/repositories/toast-service.service';

@Component({
  selector: 'app-recibir-expediente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './recibir-expediente.component.html',
  styleUrl: './recibir-expediente.component.css'
})
export class RecibirExpedienteComponent implements OnInit{

  private fb = inject(FormBuilder);
  private movimientoService = inject(MovimientoServiceService);
  private toastService = inject(ToastServiceService);

  @Input() expedienteRecibir: any;

  @Output() recibirExpediente = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<any>();

  expedienteId: string = '';
  numeroExpdiente: string = '';

  formRegister: FormGroup = this.fb.group({
    comentarioFinal: ['']
  });

  ngOnInit(): void {
    this.obtenerExpediente();
  }

  obtenerExpediente() {
    if (this.expedienteRecibir) {
      this.numeroExpdiente = this.expedienteRecibir.numeroExpediente;

      if (this.expedienteRecibir.historial && this.expedienteRecibir.historial.length > 0) {
        
        const historialOrdenado = [...this.expedienteRecibir.historial].sort((a, b) => {
          return new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime();
        });

        this.expedienteId = historialOrdenado[0].id; 
        
        console.log('Último movimiento detectado:', historialOrdenado[0]);
      }
    }
  }

  cerrarModal(){
    this.closeModal.emit();
  }

  confirmarRecepcion(){
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched();
      return;
    }

    const { comentarioFinal } = this.formRegister.value;
    const confirmar: MovimientoModel = {comentarioFinal};

    this.movimientoService.recibirExpediente(this.expedienteId, confirmar).subscribe({
      next: () => {
        this.toastService.success("Expdiente confirmado en oficina");
        this.recibirExpediente.emit();
        this.cerrarModal();
      },
      error: (err) => {
        console.log(err);
        this.toastService.error("Error al confimar recepción");
        this.cerrarModal();
      }
    });
  }
}
