import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
export class UpdateCiudadDto {
    @IsString({ message: 'El nombre es requerido' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MaxLength(50, { message: 'El nombre no puede superar los 50 caracteres' })
    nombre!: string;
}
