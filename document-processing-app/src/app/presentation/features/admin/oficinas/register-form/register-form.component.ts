import { Component, Output, EventEmitter, inject, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { OficinaServiceService } from '../../../../../data/repositories/oficina-service.service';
import { OficinaModel } from '../../../../../data/models/oficina-model';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
  private oficinaService = inject(OficinaServiceService);
  private fb = inject(FormBuilder);

  listaOficinas: any[] = [];

  @Input() oficinaEditar: any = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() oficinaCreada = new EventEmitter<void>();

  registerForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    oficinaPadreId: [null]
  });

  ngOnInit(): void {
    this.obtenerOficinas(); 
  }

  cerrar(){
    this.closeModal.emit(); 
  }
 
  crearficina() {
    const { nombre, oficinaPadreId } = this.registerForm.value;
    const nuevaOficina: OficinaModel = {
      nombre: nombre.trim(),
      oficinaPadreId: (oficinaPadreId === '' || !oficinaPadreId) ? null : oficinaPadreId
    }

    if(this.oficinaEditar){
      const idOficina = this.oficinaEditar.id;
      this.oficinaService.actualizarOficina(idOficina, nuevaOficina).subscribe({
        next: () => {
          this.oficinaCreada.emit();
          this.cerrar();
          this.limpiarCampos();
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.oficinaService.crearNuevaOficina(nuevaOficina).subscribe({
        next: () => {
          this.oficinaCreada.emit();
          this.cerrar();
        },
        error: (err) => {
          console.log(err);
          this.cerrar();
        }
      });
    }
  }

  obtenerOficinas(){
    this.oficinaService.obtenerOficinas().subscribe({
      next: (data) => {
        if(this.oficinaEditar){
          this.listaOficinas = data.filter((o: any) => o.id !== this.oficinaEditar.id);
          this.registerForm.patchValue({
            nombre: this.oficinaEditar.nombre,
            oficinaPadreId: this.oficinaEditar.oficinaPadreId === '00000000-0000-0000-0000-000000000000' ? null : this.oficinaEditar.oficinaPadreId
          });
        } else {
          this.listaOficinas = data;
        }       
      },
      error: () => {
        console.log("Error");
      }
    });
  }

  limpiarCampos(){
    this.registerForm.patchValue({
      nombre: '',
      oficinaPadreId: null
    });
  }
}
