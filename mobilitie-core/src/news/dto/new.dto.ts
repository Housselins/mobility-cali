import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNewDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  content?: Record<string, any>;

  @IsOptional()
  image?: string;
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
