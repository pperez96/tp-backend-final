import { Detalle } from '../model/detalle';

export class Consumo {
    id? : number;
    fecha_creacion?: string; 
    fecha_cierre: string; 
    id_cliente: number; 
    total: number; 
    is_open: boolean;
    id_mesa: number;
    detalles: Detalle[];
}