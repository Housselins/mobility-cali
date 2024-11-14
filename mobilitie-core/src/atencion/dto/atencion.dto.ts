import {IsNotEmpty, IsNumber, IsString } from 'class-validator'; 

export class CreateHorarioDireccionDTO {
    titulo: string;
    direccion: string;
    tipo: string;
    horario: string;
    pertenece: string;
}