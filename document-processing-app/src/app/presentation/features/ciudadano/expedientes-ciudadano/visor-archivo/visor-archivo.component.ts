import { Component, Output, EventEmitter, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ArchivoServiceService } from '../../../../../data/repositories/archivo-service.service';

@Component({
  selector: 'app-visor-archivo',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './visor-archivo.component.html',
  styleUrl: './visor-archivo.component.css'
})
export class VisorArchivoComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private archivoService = inject(ArchivoServiceService);

  urlSegura: SafeResourceUrl | null = null;
  esPdf: boolean = false;
  esImagen: boolean = false;

  @Input() archivoSeleccionado: any = null;
  @Output() closeVisor = new EventEmitter<void>(); 

  ngOnInit(): void {
    if (this.archivoSeleccionado) {
      this.procesarArchivo(this.archivoSeleccionado);
    }
  }

  procesarArchivo(archivo: any) {
    if (!archivo || !archivo.extension || !archivo.id) return;

    const ext = archivo.extension.replace('.', '').toLowerCase().trim();
    this.esPdf = ext === 'pdf';
    this.esImagen = ['jpg', 'jpeg', 'png', 'gif'].includes(ext);

    this.archivoService.verArchivo(archivo.id).subscribe({
      next: (blobData: Blob) => {
        const urlBlob = URL.createObjectURL(blobData);
        
        this.urlSegura = this.sanitizer.bypassSecurityTrustResourceUrl(urlBlob);
      },
      error: (err) => {
        console.error('Error de autenticación o de servidor al obtener el archivo:', err);
      }
    });
  }

  cerrarVisor() {
    this.closeVisor.emit(); 
  }
}