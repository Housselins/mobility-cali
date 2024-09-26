import {IsNotEmpty, IsNumber, IsString } from 'class-validator'; 

export class CreateFooterDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    nombreColumna: string;
}