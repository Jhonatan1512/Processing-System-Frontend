import { Observable } from "rxjs";
import { ExpedienteModel } from "../../data/models/expediente-model";

export interface ExpedienteRepository{
    obtenerExpedientes(): Observable<any>;
    crearExpediente(data: ExpedienteModel): Observable<any>;
}