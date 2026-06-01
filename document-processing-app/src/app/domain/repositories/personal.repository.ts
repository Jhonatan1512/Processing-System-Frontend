import { Observable } from "rxjs";
import { PersonalModel } from "../../data/models/personal-model";

export interface PersonalRepository{
    obtenerPersonal(): Observable<any>;
    crearPersonal(data: PersonalModel): Observable<any>;
    editarPersonal(id: string, data: PersonalModel): Observable<any>;
}