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
  id?: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  content?: Record<string, any>;

  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;
}

export interface NewInterface {
  id: number;
  title: string;
  content?: Record<string, any>;
  image?: string;
  isEnabled: boolean;
  createdAt: string;
  updateddAt: string;
}
