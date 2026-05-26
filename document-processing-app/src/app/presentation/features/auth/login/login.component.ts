import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  esLogin = signal<boolean>(true);

  // Método para alternar entre pantallas de forma instantánea
  conmutarPantalla(): void {
    this.esLogin.update(estado => !estado);
  }
}
