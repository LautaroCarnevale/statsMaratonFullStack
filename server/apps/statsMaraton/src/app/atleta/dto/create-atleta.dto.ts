import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateAtletaDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  @Min(10000000, { message: 'El DNI debe tener al menos 8 dígitos' })
  dni!: number;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: 'El tiempo es obligatorio' })
  @Matches(/^\d{2}:\d{2}:\d{2}$/, {
    message: 'El tiempo debe tener el formato HH:MM:SS',
  })
  tiempo!: string;

  @IsNumber()
  @IsNotEmpty({ message: 'La posición es obligatoria' })
  @Min(1, { message: 'La posición debe ser un número mayor o igual a 1' })
  posicion!: number;

  @IsString()
  @IsNotEmpty({ message: 'La ciudad es obligatoria' })
  ciudadId!: string;
}
