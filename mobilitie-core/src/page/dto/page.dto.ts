import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePageDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  views?: string;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
