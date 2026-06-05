import { Observable } from "rxjs";
import { MovimientoModel } from "../../data/models/movimiento-model";

export interface MovimientoRepository {
    recibirExpediente(id: string, data: MovimientoModel): Observable<any>; 
}