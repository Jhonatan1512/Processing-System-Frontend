import { Component, inject, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovimientoServiceService } from '../../../../data/repositories/movimiento-service.service';
import { RegistrarMovimientoModel } from '../../../../data/models/movimiento-model';
import { ToastServiceService } from '../../../../data/repositories/toast-service.service';
import { OficinaServiceService } from '../../../../data/repositories/oficina-service.service';

@Component({
  selector: 'app-derivar-expediente',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './derivar-expediente.component.html',
  styleUrl: './derivar-expediente.component.css'
})
export class DerivarExpedienteComponent implements OnInit {
  private fb = inject(FormBuilder);
  private movimientoService = inject(MovimientoServiceService);
  private toastService = inject(ToastServiceService);
  private oficinaService = inject(OficinaServiceService);
 
  @Input() expedienteMover: any; 
  @Input() esMesaDePartes : any;

  @Output() closeModal = new EventEmitter<any>();
  @Output() crearMovimiento = new EventEmitter<any>();

  listaOficinas: any[] = [];
  expdienteSeleccionadoId: string = '';
  numeroExpdiente: string = '';
  derivarExpdiente: number = 2;

  formRegister: FormGroup = this.fb.group({
    oficinaDestinoId: [''],
    comentarioDerivacion: ['', [Validators.required]],
    
  });

  ngOnInit(): void {
    this.obtenerOficinas();
    this.obtenerExpdienteId();
  }

  obtenerOficinas(){
    this.oficinaService.obtenerOficinas().subscribe({
      next: (data) => {
        this.listaOficinas = data;
      }
    })
  }

  obtenerExpdienteId(){
    if(this.expedienteMover){
      this.expdienteSeleccionadoId = this.expedienteMover.id;      
      this.numeroExpdiente = this.expedienteMover.numeroExpediente;
    }
  }

  cerraModal(){
    this.closeModal.emit();
  }

  registrarMovimiento(){
    if(this.formRegister.invalid){
      this.formRegister.markAllAsTouched();
      return;
    }

    const formValues = this.formRegister.value;
    const newMov: RegistrarMovimientoModel = {
      expedienteId: this.expdienteSeleccionadoId, 
      oficinaDestinoId: formValues.oficinaDestinoId, 
      comentarioDerivacion: formValues.comentarioDerivacion, 
      estado: Number(this.derivarExpdiente)
    }

    this.movimientoService.regitrarMovimiento(newMov).subscribe({
      next: () => {
        this.toastService.success("Movimiento de expediente registrado");
        this.crearMovimiento.emit();
        this.cerraModal();
      },
      error: (err) => {
        this.toastService.error("Error al registrar movimiento del expediente");
        console.log(err);
      }
    });
  }
}
