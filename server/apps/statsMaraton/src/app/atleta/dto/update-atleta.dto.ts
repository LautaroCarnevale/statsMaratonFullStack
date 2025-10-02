import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAtletaDto {
  @IsNumber()
  @IsNotEmpty()
  dni!: number;

  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  tiempo!: string; 

  @IsNumber()
  @IsNotEmpty()
  posicion!: number;

  @IsString()
  @IsNotEmpty()
  ciudadId!: string;
}
