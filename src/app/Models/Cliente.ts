//Representacion del json
export interface Cliente{
    id : number;
    numero_Identificacion : number;
    primer_Nombre : string;
    segundo_Nombre : string;
    primer_Apellido : string;
    segundo_Apellido : string;
    telefono : string;
    email : string;
    fecha_nacimiento : Date;
    valor_Estimado_Seguro : number;
    observaciones : string;
}