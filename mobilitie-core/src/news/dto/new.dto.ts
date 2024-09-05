import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  contenido_noticia?: string;

  @IsOptional()
  image?: string;
}

export interface NewInterface {
  id: number;
  title: string;
  contenido_noticia?: string;
  image?: string;
  isEnabled: boolean;
  createdAt: string;
  updateddAt: string;
}