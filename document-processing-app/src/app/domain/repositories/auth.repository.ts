import { Observable } from "rxjs";

export interface AuthRepository{
    iniciarSesion(credenciales: any): Observable<string>;
    cerrarSesion(): Observable<any>;
    obtenerNombreUsuario(): string;
    obtenerRolUsuario(): string;
    obtenerIdOfincina(): string;
    obtenerNombreOficina(): string;
}