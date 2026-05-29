import { Observable } from "rxjs";
import { CiudadanoModel } from "../../data/models/ciudadano-model";

export interface CiudadanoRepository{ 
    registroCiudadanos(data: CiudadanoModel): Observable<any>;
}