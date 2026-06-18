import { Observable } from "rxjs";
import { FinalizarMovimientoModel, MovimientoModel, RegistrarMovimientoModel } from "../../data/models/movimiento-model";

export interface MovimientoRepository {
    recibirExpediente(id: string, data: MovimientoModel): Observable<any>; 
    regitrarMovimiento(data: RegistrarMovimientoModel): Observable<any>;
    finalizarMovimiento(data: FinalizarMovimientoModel): Observable<any>;
}