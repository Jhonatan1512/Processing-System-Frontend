import { Observable } from "rxjs";
import { ArchivoModel } from "../../data/models/archivo-model";

export interface ArchivRepository{
    subirArchivo(data: ArchivoModel): Observable<any>;
    eliminarArchivo(id: string): Observable<any>;
    verArchivo(id: string): Observable<any>;
    obtenerUrlVisro(id: string): string;
    modificarArchivo(id: string, data: ArchivoModel): Observable<any>;
}