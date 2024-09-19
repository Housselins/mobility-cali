import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateNewDTO {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  contenido_noticia?: string;

  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  attached?: boolean;
}

export interface NewInterface {
  id: number;
  title: string;
  contenido_noticia?: string;
  image?: string;
  attached?: boolean;
  isEnabled: boolean;
  createdAt: string;
  updateddAt: string;
}

export interface NewFilter {
  id?: number;
  title?: string;
  contenido_noticia?: string;
  image?: string;
  attached?: boolean;
  isEnabled?: boolean;
  createdAt?: string;
  updateddAt?: string;
}
