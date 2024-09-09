import {IsNotEmpty, IsString } from 'class-validator'; 

export class CreateBannerDTO {
    @IsString()
    @IsNotEmpty()
    alt: string;
    
    @IsString()
    @IsNotEmpty()
    image: string;

 
}