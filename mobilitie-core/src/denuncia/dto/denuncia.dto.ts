import {IsNotEmpty, IsString } from 'class-validator'; 


export class CreateDenunciaDTO {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    apellido: string;

    @IsString()
    @IsNotEmpty()
    numeroIdentificacion: string;

    @IsString()
    @IsNotEmpty()
    sexo: string;

    @IsString()
    @IsNotEmpty()
    correo: string;

    @IsString()
    @IsNotEmpty()
    telefono: string;

    @IsString()
    @IsNotEmpty()
    direccion: string;
}