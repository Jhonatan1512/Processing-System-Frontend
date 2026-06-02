import { Observable } from "rxjs";
import { TipoDocModel } from "../../data/models/tipo-doc-model";

export interface TipoDocRepository{
    obtenerTipoDoc(): Observable<any>;
    crearTipoDoc(data: TipoDocModel): Observable<any>;
    editarRegistro(id: string, data: TipoDocModel): Observable<any>;
}