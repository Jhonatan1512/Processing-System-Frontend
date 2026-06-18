export interface MovimientoModel{
    comentarioFinal: string
}

export interface RegistrarMovimientoModel{
    expedienteId: string,
    oficinaDestinoId?: string,
    comentarioDerivacion: string
    estado: number
}

export interface FinalizarMovimientoModel{
    expedienteId: string,
    comentarioFinal: string
    estado: number
}