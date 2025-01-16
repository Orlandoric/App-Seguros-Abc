//Representacion del json
export interface Cliente{
    id : number;
    numeroIdentificacion : number;
    primerNombre : string;
    segundoNombre : string;
    primerApellido : string;
    segundoApellido : string;
    telefono : string;
    email : string;
    fechaNacimiento : Date;
    valor : number;
    observaciones : string;
}