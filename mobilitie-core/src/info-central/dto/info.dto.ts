import {IsNotEmpty, IsString } from 'class-validator';

export class CreateInfoDTO {
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @IsString()
    @IsNotEmpty()
    contenido_info: string;
    
    @IsString()
    @IsNotEmpty()
    image?: string;
  }