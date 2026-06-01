import { Observable } from "rxjs";
import { OficinaModel } from "../../data/models/oficina-model";

export interface OficinaRepository{
    obtenerOficinas(): Observable<any>;
    crearNuevaOficina(data: OficinaModel): Observable<any>;
    actualizarOficina(id: string, data: OficinaModel): Observable<any>;
}